import { Component, ViewEncapsulation, ViewChild, Input, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'tfc-cmp-modal',
    templateUrl: './modal.template.html',
    styleUrls: ['./modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
    modal: any = {
        config: {
            buttons: []
        }
    };

    @ViewChild('notificationModal')
    public notificationModal: HTMLElement;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService.modal.el = this.notificationModal;
        this.modal.config = this.notificationService.modal.config;
    }
}
