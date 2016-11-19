import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

@Component({
    selector: 'tfc-modal-component',
    templateUrl: './modal.template.html',
    styleUrls: ['./modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

    @ViewChild('notificationModal')
    public notificationModal: HTMLElement;
}
