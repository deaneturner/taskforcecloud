import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'messenger/build/js/messenger.min';
declare var Messenger: any;

import {ModalComponent} from '../shared/modal-window/modal.component';

export class NotificationService {
    modal: any = {
        el: '',
        config: {}
    };

    constructor() {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top messenger-on-center',
            theme: 'air'
        }
    }

    displayMessage(config: any) {
        Messenger().post( {
            message: config.message,
            type: config.type,
            showCloseButton: true
        });
    }

    handleError(response: Response) {
        let error = response.json();
        if (!error || !error.code || !error.message) {
            // no http connection
            error = {
                code: 'Connection Error',
                message: 'No data connection found!'
            }
        }
        // this.displayMessage is not available due to rxjs/Rx closure
        Messenger().post( {
            message: error.code + ': ' + error.message,
            type: 'error',
            showCloseButton: true
        });
        return Observable.throw(error.json());
    }

    showModal(config: any) {
        Object.assign(this.modal.config, config);
        this.modal.el.open();
    }
}