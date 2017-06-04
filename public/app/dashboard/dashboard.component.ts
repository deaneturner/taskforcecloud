import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';

@Component({
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  appConfig: any;
  month: any;
  year: any;

  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig.getConfig();
  }

  ngOnInit(): void {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
  }
}
