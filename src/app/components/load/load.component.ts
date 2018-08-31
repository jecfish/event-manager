import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'iox-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent {

  private tblPeople: AngularFirestoreCollection<People>;
  frm: FormGroup;

  constructor(fb: FormBuilder, afs: AngularFirestore) {
    this.tblPeople = afs.collection<People>('people');

    this.frm = fb.group({
      jsonStr: ['', Validators.required]
    });
  }

  load(str: string) {
    const list = JSON.parse(str);
    list.forEach(x => {
      this.tblPeople.doc(x.seq).set(x);
    });
  }
}
