import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../../app.config';
declare var jQuery: any;

@Component({
    selector: 'tfc-client-list',
    templateUrl: './client-list.template.html',
    styleUrls: ['./client-list.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientListComponent {
    @Input() data: any;
    appConfig: any;

    constructor(appConfig: AppConfig) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
    };
}
