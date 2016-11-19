import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'messenger/build/js/messenger.min';
declare var Messenger: any;

export class NotificationService {
    modal: any;

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

    initModal(modalEl: HTMLElement) {
        this.modal = modalEl;
    }
}