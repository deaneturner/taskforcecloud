import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'tfc-services-modal-component',
    templateUrl: './services-modal.template.html',
    styleUrls: ['./services-modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicesModalComponent {
    @ViewChild('servicesModal')
    public el: any;

    config: any = {
        title: 'Confirm Delete',
        subTitle: null,
        content: 'Are you sure you want to delete client item:',
        subContent: 'UNDO'
    };

    close() {
        this.el.close();
    }

    open() {
        this.el.open();
    }
}
