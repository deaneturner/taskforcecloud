import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {AppConfig} from '../app.config';
declare var jQuery: any;

@Component({
    selector: 'users',
    templateUrl: './users.template.html',
    styleUrls: ['./users.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
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
        this.panel = {
            title: 'Users',
            iconClass: ['glyphicon-user']
        };
    }
}
