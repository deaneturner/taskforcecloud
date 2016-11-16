import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';

import {ModalService} from '../../services/modal.service'

@Component({
    selector: 'user-detail',
    templateUrl: 'user-detail.template.html',
    styleUrls: ['user-detail.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit{
    appConfig: any;
    panel: any;

    constructor(appConfig: AppConfig, private modalService: ModalService) {
        this.appConfig = appConfig.getConfig();
    }

    ngOnInit(): void {
        this.panel = {
            title: 'Profile',
            collapsed: false,
            close: false,
            fullScreen: false,
            showDropdown: true,
            onMenuSelect: this.onMenuSelect,
            modalService: this.modalService
        };
    }

    onMenuSelect($event) {
        console.log($event);
        this.modalService.modal.open();
    }
}