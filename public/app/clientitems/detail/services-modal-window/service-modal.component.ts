import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'tfc-service-modal-component',
    templateUrl: './service-modal.template.html',
    styleUrls: ['./service-modal.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServiceModalComponent {
    @ViewChild('servicesModal')
    public el: any;

    config: any = {
        title: 'Confirm Delete',
        subTitle: null,
        content: 'Are you sure you want to delete client item:',
        subContent: 'UNDO',
        buttons: [{
            title: 'Cancel',
            onClick: ($event) => {
                this.close();
            },
            class: 'btn btn-gray'
        }, {
            title: 'Yes, delete',
            onClick: ($event) => {
                this.close();
                // self.clientItemService
                //     .deleteClientItem(self.clientItem._id)
                //     .subscribe(
                //         clientItem => {
                //             self.notificationService.displayMessage({
                //                 message: 'Deleted ' +
                //                 clientItem.name,
                //                 type: 'success'
                //             });
                //
                //             self.clientItemService.clearClientItemContext();
                //
                //             self.notificationService.closeModal();
                //             self.router.navigate(['/app/clients/detail',
                //                 self.client._id]);
                //         },
                //         error => {
                //         }  // error is handled by service
                //     );
            },
            class: 'btn btn-success'
        }]
    };

    close() {
        this.el.close();
    }

    open() {
        this.el.open();
    }
}
