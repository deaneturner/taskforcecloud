import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'tfc-modal-component',
    templateUrl: './modal.template.html',
    styleUrls: ['./modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
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
