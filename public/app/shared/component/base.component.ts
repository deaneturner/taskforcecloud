import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../../app.service';

export class BaseComponent {

    constructor(protected appState: AppState,
                protected router: Router) {
    }

    /*
     * Navigate and pass data (e.g. selected user) to shared app state service
     */
    navigate(routerLink: Array<string>, data: any) {
        if (data) {
            Object.keys(data).forEach(key => {
                if (data.hasOwnProperty(key)) {
                    this.appState.set(key, data[key]);
                }
            });
        }
        this.router.navigate(routerLink);
    }
}
