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
    listConfig: ListConfig;
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
        this.appConfig = config.getConfig();
    }

    ngOnInit(): void {
        jQuery('.widget-container').sortable(this.sortOptions);
        this.listConfig = new ListConfig('Users', []);
    }
}
