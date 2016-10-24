import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';
declare var jQuery: any;

@Component({
  selector: 'admin2',
  templateUrl: './admin2.template.html',
  styleUrls: ['./admin2.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Admin2 {
  config: any;
  month: any;
  year: any;
  sortOptions: Object = {
    connectWith: '.widget-container',
    handle: 'header, .handle',
    cursor: 'move',
    iframeFix: false,
    items: '.widget:not(.locked)',
    opacity: 0.8,
    helper: 'original',
    revert: true,
    forceHelperSize: true,
    placeholder: 'widget widget-placeholder',
    forcePlaceholderSize: true,
    tolerance: 'pointer'
  };

  constructor(config: AppConfig) {
    this.config = config.getConfig();
  }

  ngOnInit(): void {
    jQuery('.widget-container').sortable(this.sortOptions);

    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
  }
}
