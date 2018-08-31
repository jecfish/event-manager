import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CHECK_TYPE } from './misc/enums';

// components
import { LoadComponent } from './components/load/load.component';
import { CheckComponent } from './components/check/check.component';
import { HomeComponent } from './components/home/home.component';
import { CheckGuard } from './misc/check.guard';
import { GrantComponent } from './components/grant/grant.component';
import { SearchComponent } from './components/search/search.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RightComponent } from './components/right/right.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'grant',
    component: GrantComponent,
    data: { type: 'GRANT' },
    canActivate: [CheckGuard]
  },
  {
    path: 'rights',
    component: RightComponent,
    data: { type: 'RIGHTS' },
    canActivate: [CheckGuard]
  },
  {
    path: 'badge',
    component: BadgeComponent,
    data: { type: 'BADGE' },
    canActivate: [CheckGuard]
  },
  {
    path: 'load',
    component: LoadComponent,
    data: { type: 'LOAD' },
    canActivate: [CheckGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { type: 'SEARCH' },
    canActivate: [CheckGuard]
  },
  {
    path: 'shirt',
    component: CheckComponent,
    data: { type: CHECK_TYPE.shirt },
    canActivate: [CheckGuard]
  },
  {
    path: 'check-in',
    component: CheckComponent,
    data: { type: CHECK_TYPE.check },
    canActivate: [CheckGuard]
  },
  {
    path: 'lucky',
    component: CheckComponent,
    data: { type: CHECK_TYPE.lucky },
    canActivate: [CheckGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { type: 'DASHBOARD' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
