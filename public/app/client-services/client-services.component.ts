import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';

declare var jQuery: any;

@Component({
    selector: 'client-service',
    templateUrl: './client-services.template.html',
    styleUrls: ['./client-services.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServicesComponent {
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

    constructor(config: AppConfig,
                private router: Router) {
        this.appConfig = config.getConfig();
    }

    ngOnInit(): void {
        jQuery('.widget-container').sortable(this.sortOptions);

        this.panel = {
            title: 'Clients',
            iconClass: ['fa-handshake-o'],
            collapsed: false,
            close: false,
            fullScreen: false,
            menu: [{
                title: 'Add',
                onMenuSelect: () => this.onMenuSelect('add')
            }],
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

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'add':
                this.router.navigate(['/app/client-services/edit/new']);
                break;
            default: // do nothing
        }
    }
}
