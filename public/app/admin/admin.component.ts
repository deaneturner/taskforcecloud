import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppConfig } from '../app.config';
declare var jQuery: any;

@Component({
    selector: 'admin',
    templateUrl: './admin.template.html',
    styleUrls: ['./admin.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
    appConfig: any;
    panel: any;
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

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
        jQuery('.widget-container').sortable(this.sortOptions);

        this.panel = {
            title: 'Users',
            iconClass: ['glyphicon-user'],
            collapsed: true
        };
    }
}
