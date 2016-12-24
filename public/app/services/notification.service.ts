import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'messenger/build/js/messenger.min';
declare var Messenger: any;

@Injectable()
export class NotificationService {
    modal: any = {
        el: '',
        config: {}
    };

    constructor() {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-center',
            theme: 'air'
        };
    }

    displayMessage(config: any) {
        Messenger().post({
            message: config.message,
            type: config.type,
            showCloseButton: true
        });
    }

    handleError(response: Response) {
        let error = response.json();
        // this.displayMessage is not available due to rxjs/Rx closure
        Messenger().post({
            message: (error.code || error.status) + ': ' + error.message,
            type: 'error',
            showCloseButton: true
        });
        return Observable.throw(error.json());
    }

    showModal(config: any) {
        Object.assign(this.modal.config, config);
        this.modal.el.open();
    }

    closeModal() {
        this.modal.el.close();
    }
}
