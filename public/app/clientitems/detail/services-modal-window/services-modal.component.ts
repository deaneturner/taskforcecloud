import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'tfc-services-modal-component',
    templateUrl: './services-modal.template.html',
    styleUrls: ['./services-modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicesModalComponent {
    @ViewChild('servicesModal')
    public el: any;

    selectedServices: string [] = [];

    config: any = {
        title: 'Add Target Services',
        subTitle: null,
        content: 'Choose the services you would like to add to target:'
    };

    close() {
        this.el.close();
    }

    open() {
        this.el.open();
    }
}
