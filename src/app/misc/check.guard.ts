import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccessService } from './access.service';
import { map, tap } from 'rxjs/operators';
import { SESSION_KEY } from './enums';

@Injectable({
  providedIn: 'root'
})
export class CheckGuard implements CanActivate {
  constructor(private accessSvc: AccessService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.accessSvc.getAll()
      .pipe(
        tap(({ user, access }) => {
          if (user) {
            sessionStorage.setItem(SESSION_KEY.USER, user);
          }

          if (access) {
            return;
          }
          alert(`You don't have permissions to access this page!`);
          this.router.navigateByUrl('/');
        }),
        map(({ access }) => access.includes(next.data.type))
      );
  }
}
