import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';

declare var jQuery: any;

@Component({
    selector: 'client-service',
    templateUrl: './clientservices.template.html',
    styleUrls: ['./clientservices.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientServicesComponent {
    appConfig: any;
    panel: any;
    iconClass = ['fa', 'fa-cubes'];
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
            title: 'Services',
            iconClass: this.iconClass,
            collapsible: true,
            menu: [{
                title: 'Add',
                onMenuSelect: () => this.onMenuSelect('add')
            }]
        };
    }

    onMenuSelect(action: string) {
        const self = this;
        switch (action) {
            case 'add':
                this.router.navigate(['/app/clientservices/edit/new']);
                break;
            default: // do nothing
        }
    }
}
