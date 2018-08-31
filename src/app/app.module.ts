import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { CheckComponent } from './components/check/check.component';
import { LoadComponent } from './components/load/load.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GrantComponent } from './components/grant/grant.component';
import { SearchComponent } from './components/search/search.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// directives
import { ChartDirective } from './directives/chart.directive';
import { RightComponent } from './components/right/right.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckComponent,
    LoadComponent,
    HomeComponent,
    LoginComponent,
    GrantComponent,
    SearchComponent,
    BadgeComponent,
    DashboardComponent,
    ChartDirective,
    RightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
