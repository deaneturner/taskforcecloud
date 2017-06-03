/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'tfc-cmp-app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './scss/application.scss'
    ],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {

    constructor(public appState: AppState) {

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }
}
