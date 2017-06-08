import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    styleUrls: ['./error.style.scss'],
    templateUrl: './error.template.html',
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent {
    @HostBinding('class.error-page') isErrorPageClassActive: boolean = true;
    @HostBinding('class.app') isAppClassActive: boolean = true;
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    searchResult(): void {
        this.router.navigate(['/app', 'dashboard']);
    }
}
