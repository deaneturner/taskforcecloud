import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

@Component({
    selector: 'modal-component',
    templateUrl: './modal.template.html',
    styleUrls: ['./modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

    @ViewChild('myModal')
    public myModal: HTMLElement;
}
