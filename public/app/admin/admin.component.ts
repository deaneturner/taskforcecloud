import {Component, ViewEncapsulation} from '@angular/core';
import {AppConfig} from '../app.config';
import {ListConfig} from '../shared/list/list.component';
declare var jQuery: any;

@Component({
    selector: 'admin',
    templateUrl: './admin.template.html',
    styleUrls: ['./admin.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Admin {
    appConfig: any;
    list: any;
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

        this.list = {
            config: new ListConfig({
                title: 'Users',
                icon: ['glyphicon-user']
            }),
            data: [{
                name: 'Maikel Basso',
                imgSrc: 'assets/img/people/a1.jpg',
                lastUpdated: 'about 2 mins ago',
                indicatorClass: ['text-danger']
            }, {
                name: 'Ianus Arendse',
                imgSrc: 'assets/img/people/a2.jpg',
                lastUpdated: 'about 42 mins ago',
                indicatorClass: ['text-info']
            }, {
                name: 'Valdemar Landau',
                imgSrc: 'assets/img/people/a3.jpg',
                lastUpdated: 'one hour ago',
                indicatorClass: ['text-success']
            }, {
                name: 'Rick Teagan',
                imgSrc: 'assets/img/people/a4.jpg',
                lastUpdated: '3 hours ago',
                indicatorClass: ['text-warning']
            }]
        };
    }
}
