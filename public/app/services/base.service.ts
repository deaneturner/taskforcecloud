import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'messenger/build/js/messenger.min';
declare var Messenger: any;

export class BaseService {

    constructor() {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
            theme: 'air'
        }
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
        Messenger().post( {
            message: error.code + ': ' + error.message,
            type: 'error',
            showCloseButton: true
        });
        return Observable.throw(error.json());
    }
}