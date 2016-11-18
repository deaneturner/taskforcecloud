import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
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
