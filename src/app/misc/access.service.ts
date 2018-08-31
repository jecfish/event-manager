import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private http: HttpClient) { }

  getAll() {
    const getUserRight = (email) => this.afs.doc<Right>(`rights/${email}`).valueChanges()
      .pipe(map(x => ({ user: email, access: (x && x.access) || [] })));
    return this.afAuth.user.pipe(
      switchMap<any, Right>(x => x ? getUserRight(x.email) : of({} as any)),
      map(x => ({ user: x.user || '', access: x.access || [] }))
    );
  }

  getSurvey() {
    const range = 'survey!B2:B';

    // tslint:disable-next-line:max-line-length
    const url = `${environment.sheet.baseUrl}/${environment.sheet.id}/values/${range}?key=${environment.sheet.apiKey}&majorDimension=COLUMNS`;

    return this.http.get<{ values: string[][] }>(url)
      .pipe(
        map(x => (x.values && x.values[0]) || [])
      );
  }
}
