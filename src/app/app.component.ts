import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { CHECK_TYPE } from './misc/enums';
import { AccessService } from './misc/access.service';

@Component({
  selector: 'iox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  subtitle = '';
  user$ = this.afAuth.user;
  links = [
    { type: 'SEARCH', label: 'search', url: '/search', isHide: true },
    { type: CHECK_TYPE.check, label: 'check-in', url: '/check-in', isHide: true },
    { type: 'BADGE', label: 'badge', url: '/badge', isHide: true },
    { type: CHECK_TYPE.shirt, label: 'shirt', url: '/shirt', isHide: true },
    { type: CHECK_TYPE.lucky, label: 'lucky', url: '/lucky', isHide: true },
  ];

  get viewableLinks() {
    return this.links.filter(x => !x.isHide);
  }

  constructor(
    private title: Title,
    private router: Router,
    private afAuth: AngularFireAuth,
    private accessSvc: AccessService) {

    this.restrictAccess();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;

      this.subtitle = event.url.substr(1) || 'HOME';
      this.title.setTitle(`${this.subtitle} | ioxkl`);
    });
  }

  private restrictAccess() {
    this.accessSvc.getAll().subscribe(({ access }) => {
      this.links.forEach(x => {
        x.isHide = !access.includes(x.type);
      });
    });
  }
}
