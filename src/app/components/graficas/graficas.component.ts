import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: []
})
export class GraficasComponent implements OnInit {



  @Input('etiquetas') doughnutChartLabels: string[];
  @Input('datos') doughnutChartData: number[];
  // public doughnutChartLabels: string[] = ['algo', 'otrro', 'taaa'];
  // public doughnutChartData: number[] = this.data;
   //  doughnutChartData = this.data;
   doughnutChartType: string = 'doughnut';
  constructor() { }

  ngOnInit() {
    // this.doughnutChartLabels.push(this.labels);
    console.log(this.doughnutChartData);
    // console.log(this.data);
  }

}
