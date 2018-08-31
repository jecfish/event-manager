import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccessService } from '../../misc/access.service';
import { map } from 'rxjs/operators';
import { CHECK_TYPE } from '../../misc/enums';

@Component({
  selector: 'iox-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$ = this.afAuth.user;
  extraLinks$ = this.accessSvc.getAll().pipe(
    map(({ access }) => access.filter(i => ![CHECK_TYPE.check, CHECK_TYPE.lucky, CHECK_TYPE.shirt, 'BADGE', 'SEARCH'].includes(i)))
  );

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private accessSvc: AccessService) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('');
  }

}
