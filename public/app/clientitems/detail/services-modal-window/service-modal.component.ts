import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'tfc-service-modal-component',
    templateUrl: './service-modal.template.html',
    styleUrls: ['./service-modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServiceModalComponent {
    @Input() config: any;

    @ViewChild('servicesModal')
    public el: HTMLElement;


    config2 = {
        title: 'TEST',
        subTitle: 'TEEST'
    };
}
