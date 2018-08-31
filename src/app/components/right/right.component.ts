import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { ACCESS_LIST } from '../../misc/enums';

@Component({
  selector: 'iox-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  frm: FormGroup;
  rights$;
  accessList = [...ACCESS_LIST];
  result: Result;

  constructor(fb: FormBuilder, private afs: AngularFirestore) {
    this.rights$ = afs.collection<Right>('rights', ref => ref.orderBy('name')).valueChanges();
    this.frm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      access: [[]]
    });

    this.frm.get('email').valueChanges.pipe(
      tap(() => {
        this.result = { status: 'loading', data: { message: 'loading...' } };
      }),
      switchMap(x => afs.doc<Right>(`rights/${x}`).valueChanges())
    ).subscribe(x => {
      this.frm.get('access').setValue(x.access);
      this.result = undefined;
    }, error => {
      this.result = { status: 'error', error };
    });

    this.frm.valueChanges.subscribe(console.log);
  }

  async grant(value) {
    this.result = { status: 'updating', data: { message: 'updating...' } };

    try {
      await this.afs.doc<Right>(`rights/${value.email}`).ref.update({
        access: value.access
      });

      this.result = { status: 'success', data: { message: 'updated!' } };
    } catch (error) {
      this.result = { status: 'error', error };
    }
  }

  ngOnInit() {
  }

}
