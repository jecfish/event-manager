import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'iox-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  frm: FormGroup;
  result: Result = {};

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.frm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]]
    });
  }

  async login(value: Login) {
    this.result = {};

    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
      this.result = { status: 'success', data: result };
    } catch (error) {
      this.result = { status: 'error', error };
    }
  }

}
