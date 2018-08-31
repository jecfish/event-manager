import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import * as format from 'date-fns/format';
import { CHECK_TYPE, CHECK_CONFIG, SESSION_KEY } from '../../misc/enums';
import { Subject } from 'rxjs';

@Component({
  selector: 'iox-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  frm: FormGroup;
  list$;
  result: Result;
  isShowForm = true;
  rights$;

  get email() {
    return sessionStorage.getItem(SESSION_KEY.PAIR) || '';
  }

  set email(value: string) {
    sessionStorage.setItem(SESSION_KEY.PAIR, value);
  }

  constructor(fb: FormBuilder, private afs: AngularFirestore) {
    this.rights$ = afs.collection<Right>('rights', ref => ref.orderBy('name')).valueChanges().pipe(
      map(x => x.filter(i => i.access.includes(CHECK_TYPE.check)))
    );
    this.frm = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    if (!this.email) return;
    this.frm.setValue({ email: this.email });
    this.isShowForm = false;
    this.follow(this.email);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  follow(email: string) {
    // store email
    this.email = email;
    this.isShowForm = false;

    // where user == login_email && checkin == true && dequeue == false (not yet dequeue)
    this.list$ = this.afs.collection<People>('people', ref => {
      const [condition1, condition2] = [
        {
          key: CHECK_CONFIG[CHECK_TYPE.check].boolKey + 'By',
          op: '==' as firebase.firestore.WhereFilterOp,
          value: sessionStorage.getItem(SESSION_KEY.PAIR)
        },
        {
          key: CHECK_CONFIG[CHECK_TYPE.check].boolKey,
          op: '==' as firebase.firestore.WhereFilterOp,
          value: true
        }
      ];

      return ref
        .where(condition1.key, condition1.op, condition1.value)
        .where(condition2.key, condition2.op, condition2.value);
    }).valueChanges().pipe(
      map((x: People[]) => {
        return x
          .filter(c => !c.isGotCheckDeq)
          .sort((a, b) => (a.timeGotCheck < b.timeGotCheck) ? -1 : 1);
      }),
      takeUntil(this.destroy$)
    );
  }

  showForm() {
    this.isShowForm = true;
  }

  async dequeue(seq) {
    const doc = this.afs.doc<People>(`people/${seq}`);
    this.result = undefined;
    try {
      await doc.update({
        [CHECK_CONFIG[CHECK_TYPE.check].boolKey + 'Deq']: true,
        [CHECK_CONFIG[CHECK_TYPE.check].boolKey + 'DeqBy']: sessionStorage.getItem(SESSION_KEY.USER),
        [CHECK_CONFIG[CHECK_TYPE.check].boolKey.replace('is', 'time') + 'Deq']: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      });
      this.result = { status: 'success', data: { message: seq + ' done.' } };
    } catch (err) {
      this.result = { status: 'error', error: { seq, err } };
    }
  }
}
