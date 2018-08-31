import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import * as format from 'date-fns/format';
import { CHECK_TYPE, CHECK_STATUS, CHECK_CONFIG, SESSION_KEY } from 'src/app/misc/enums';
import { AccessService } from '../../misc/access.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'iox-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  result: Item;
  frm: FormGroup;
  isLoading = false;
  statusEnum = CHECK_STATUS;
  checkEnum = CHECK_TYPE;

  config: CheckConfig = {};

  get frmSeq() {
    return this.frm.get('seq');
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private accessSvc: AccessService) {
    // build form
    this.frm = this.fb.group({
      seq: ['', Validators.maxLength(5)],
      isSingleMode: [false]
    });
  }

  ngOnInit() {
    this.handleCheckType(this.route.snapshot.data.type);

    this.frmSeq.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((x: string) => {
        this.handleQuery(x);
      }, err => {
        this.result = { status: 'error', error: err };
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:keydown', ['$event'])
  captureKey({ key }: KeyboardEvent) {
    const val = this.frmSeq.value as string;
    if (key === 'Backspace' && val.length > 0) {
      this.frmSeq.setValue(val.substr(0, val.length - 1));
    }

    const possibilities = '1234567890 .-';
    if (!possibilities.includes(key)) return;
    this.enterKey(key);
  }

  enterKey(str: string) {
    this.frmSeq.setValue(this.frmSeq.value + str, {});
  }

  go(id: string) {
    if (id.length < 4) return;

    const formatId = id.substr(0, 3) + '-' + id.substr(3, 1);
    const tblPeople$ = this.afs
      .collection<People>('people', ref => ref.where('seq', '==', formatId))
      .valueChanges();

    this.isLoading = true;

    tblPeople$.pipe(
      map(x => x.map(i => ({ ...i, uiSeq: id }))),
      takeUntil(this.destroy$)
    ).subscribe(async ([data]) => {
      if (!data) {
        this.result = { status: this.statusEnum.NOT_FOUND };
        return;
      }

      if (this.config.type === CHECK_TYPE.lucky) {
        const isFound = await this.getSurveyStatus(id).toPromise();
        data = { ...data, survey: isFound };
      }

      this.result = { status: this.statusEnum.FOUND, data };
      this.isLoading = false;
    }, err => {
      this.result = { status: 'error', error: err };
      this.isLoading = false;
    });
  }

  private async updateStatus(id, status = true) {
    const doc = this.afs.doc<People>(`people/${id}`);

    try {
      // base update data
      let data = {
        [this.config.boolKey]: status,
        [this.config.boolKey + 'By']: sessionStorage.getItem(SESSION_KEY.USER),
        [this.config.boolKey.replace('is', 'time')]: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      };

      // updte only if running in single mode
      if (this.config.type === CHECK_TYPE.check) {
        const shouldUpdateDequeue = this.frm.value.isSingleMode ? true : status ? false : true;
        if (shouldUpdateDequeue) {
          data = {
            ...data,
            isGotCheckDeq: status,
            isGotCheckDeqBy: sessionStorage.getItem(SESSION_KEY.USER),
            timeGotCheckDeq: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
          };
        }
      }

      await doc.update(data);
    } catch (err) {
      this.result = { status: 'error', error: err };
    }
  }

  private handleCheckType(type: string) {
    this.config = CHECK_CONFIG[type];
  }

  private getSurveyStatus(seq: string) {
    return this.accessSvc.getSurvey().pipe(
      map(x => x.includes(seq))
    );
  }

  private handleQuery(query: string) {
    // console.log(query);
    // empty, no result
    if (query === '') {
      this.result = undefined;
      return;
    }

    // space, reset result
    if (query.includes(' ')) {
      this.frmSeq.setValue('', {});
      this.result = undefined;
      return;
    }

    // undo
    if (query.includes('-') && this.result.status === 'found') {
      if (this.result.data[this.config.boolKey]) {
        const ans = confirm('confirm undo?');
        if (!ans) {
          return;
        }

        this.updateStatus(this.result.data.seq, false);

        // set input to empty, but trigger changes
        this.frmSeq.setValue('', { emitEvent: false });
      } else {
        this.result = { status: this.statusEnum[`${this.config.type}_NOT_GIVEN`] };
      }
      return;
    }

    // entry with confirm, confirm if found
    if (query.includes('.') && this.result.status === 'found') {
      // if (this.result.status === 'found') {
      if (!this.result.data[this.config.boolKey]) {
        this.updateStatus(this.result.data.seq);
        this.frmSeq
          .setValue((this.frmSeq.value as string).substr(0, 4), {});
        // set input to empty, but trigger changes
        this.frmSeq.setValue('', { emitEvent: false });
      } else {
        this.result = { status: this.statusEnum[`${this.config.type}_GIVEN`] };
      }
      // } else {
      //   this.result = { status: this.statusEnum.NOT_FOUND };
      // }

      return;
    }

    // invalid pre-req, reset result
    if (query.length < 4 || query.length > 4) {
      this.result = undefined;
      return;
    }

    // valid entry, search db
    if (query.length === 4) {
      this.go(query);
      return;
    }
  }

}
