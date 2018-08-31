import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ACCESS_LIST } from '../../misc/enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iox-grant',
  templateUrl: './grant.component.html',
  styleUrls: ['./grant.component.scss']
})
export class GrantComponent implements OnInit {

  frm: FormGroup;
  accessList = [...ACCESS_LIST];

  result: Result = undefined;
  showAccessList = false;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.frm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]],
      access: [[...ACCESS_LIST.map(x => x.key)]]
    });
  }

  ngOnInit() {
    this.showAccessList = this.route.snapshot.data.type === 'GRANT';
  }

  isAccessCheck(access: string) {
    return (this.frm.get('access').value as string[]).find(x => x === access);
  }

  setAccess(access: string, isChecked) {
    const ctrl = this.frm.get('access');

    ctrl.setValue(!isChecked ?
      (ctrl.value as string[]).filter(x => x !== access) :
      [...ctrl.value, access],
      {});
  }

  async grant(value: Grant, isValid: boolean) {
    this.result = undefined;
    if (!isValid) return;
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
      await this.afs.collection<Right>('rights').doc(value.email).set({
        name: value.name.toUpperCase(),
        user: value.email,
        access: value.access
      });
      this.result = { status: 'success', data: { message: 'yay, user created.' } };
    } catch (error) {
      this.result = { status: 'error', error };
    }
  }

}
