import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
  selector: '[ioxChart]'
})
export class ChartDirective  implements OnInit {

  @Input() ioxChart: any;

  constructor(private el: ElementRef) {}

  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    // tslint:disable-next-line:no-unused-expression
    new Chart(nativeElement, this.ioxChart);
  }

}
