import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'iox-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  result: Result;
  frm: FormGroup;
  isLoading = false;
  people$: BehaviorSubject<People[]>;
  @ViewChild('q') qEl: ElementRef;

  constructor(fb: FormBuilder, afs: AngularFirestore) {
    // build form
    this.frm = fb.group({
      q: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.frm.get('q').valueChanges.subscribe((x: string) => {
      if (!x.includes('.')) return;
      this.frm.setValue({ q: '' });
    });

    this.people$ = new BehaviorSubject<People[]>([]);
    afs.collection<People>('people').valueChanges()
      .pipe(first()).subscribe(x => {
        this.people$.next(x);
      }, error => {
        this.result = { status: 'error', error };
      });
  }

  ngAfterViewInit() {
    (this.qEl.nativeElement as HTMLInputElement).focus();
  }

  clearQ() {
    this.frm.setValue({ q: '' });
    this.result = undefined;
    (this.qEl.nativeElement as HTMLInputElement).focus();
  }

  go(query: string = '') {
    const formattedQ = query.toUpperCase();
    this.result = undefined;
    (this.qEl.nativeElement as HTMLInputElement).focus();

    const list = this.people$.getValue();

    const data = list.find(rec => rec.name.includes(formattedQ) || rec.pid.includes(formattedQ));
    this.result = data ?
      { status: 'found', data } : { status: 'not found' };
  }

}
