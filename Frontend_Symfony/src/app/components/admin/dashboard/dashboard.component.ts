import { Component, OnInit } from '@angular/core';
import {ChartDataSets, RadialChartOptions, Chart, ChartType, ChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';
Chart.defaults.global.defaultFontColor = '#fff';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  admin_prenom :any ; 
  admin_nom : any; 

  lineChartType: ChartType = 'line';
  lineChartOptions: ChartOptions = {
    legend: {
      labels: {
        fontColor: "#fff",
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: true,
          color: "rgba(255,255,255,.25)"
        },
        ticks: {
          fontColor: "#fff",
        },
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: true,
          color: "rgba(255,255,255,.25)"
        },
        ticks: {
          fontColor: "#fff",
        },
      }],
    }
  } ;
  lineChartLabels: Label[] = ["January", "February", "March", "April", "May", "June", "July"];
  lineChartData: ChartDataSets[] = [
    {
      label: "My First dataset",
      backgroundColor: 'rgba(255, 255, 255, .3)',
      borderColor: 'rgba(255, 255, 255)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }
  ];


  radarChartType: ChartType = 'radar';
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scale: {
      ticks: {
        display: false
      },
    }
  };
  radarChartLabels: Label[] = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling"];
  radarChartData: ChartDataSets[] = [
    {label: "My First dataset", data: [65, 59, 90, 81, 56, 55]},
    {label: "My Second dataset", data: [28, 48, 40, 19, 96, 27]}
  ];

  barChartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLabels: Label[] =["January", "Febuary", "March", "April", "May", "June"];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.3)'
      ],
      borderColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)'
      ],
      borderWidth: 1,
    }
  ];

  pieChartLabels: Label[] = ["March", "April", "May", "June"];
  pieChartOptions: ChartOptions = {
    responsive: true
  };
  pieChartData: ChartDataSets[] = [
    {
      data: [160, 50, 100, 40],
      backgroundColor: ["#4285F4", "#ffbb33", "#45cafc", "#FF5252"],
      hoverBackgroundColor: ["#6ea0f2", "#fec451", "#78daff", "#fa6e6e"]
    }
  ];
  pieChartType: ChartType = 'pie';


  constructor() {
    this.admin_prenom = localStorage.getItem('prenom_user');
    this.admin_nom = localStorage.getItem('nom_user');;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
