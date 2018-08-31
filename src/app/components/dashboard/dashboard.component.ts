import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, interval, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'iox-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalPeopleCount$: Observable<TotalPeople>;
  people$: Observable<People[]>;
  checkChart;
  shirtChart;
  luckyChart;

  constructor(afs: AngularFirestore) {
    this.totalPeopleCount$ = afs.doc<TotalPeople>('total/people').valueChanges();
    this.people$ = afs.collection<People>('people').valueChanges();
  }

  ngOnInit() {
    combineLatest(
      this.totalPeopleCount$,
      this.people$,
    ).subscribe(([totalPeople, list]) => {
      if (!(totalPeople && list)) return;
      const max = totalPeople.count;
      const totalCheck = list.filter(x => x.isGotCheck).length;
      const totalShirt = list.filter(x => x.isGotShirt).length;
      const totalLucky = list.filter(x => x.isGotLucky).length;
      console.log(totalCheck);
      this.checkChart = undefined;
      this.shirtChart = undefined;
      this.luckyChart = undefined;

      interval(1).pipe(take(1)).subscribe(() => {
        this.checkChart = this.drawPie(
          'Check-in',
          [`Not Yet (${max - totalCheck})`, `Checked-in (${totalCheck})`],
          [max - totalCheck, totalCheck]
        );

        this.shirtChart = this.drawPie(
          'Shirt',
          [`Not Yet (${max - totalShirt})`, `Gave (${totalShirt})`],
          [max - totalShirt, totalShirt]
        );

        this.luckyChart = this.drawPie(
          'Lucky Draw',
          [`Not Yet (${max - totalLucky})`, `Dropped (${totalLucky})`],
          [max - totalLucky, totalLucky]
        );
      });
    });
  }

  drawPie(title: string, labels: string[], numbers: number[]) {
    const options = {
      animation: false,
      responsive: true,
      title: {
        display: true,
        text: title,
        fontSize: 18,
      }
    };

    const data = {
      labels,
      datasets: [
        {
          data: numbers,
          backgroundColor: [
            '#e3e4e5',
            '#d1c5e2',
          ]
        }
      ]
    };

    return {
      type: 'pie',
      data,
      options
    };
  }
}
