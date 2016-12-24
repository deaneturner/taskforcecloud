import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MessageBusService } from '../services/message.bus.service';
import { Login } from './login.component';

export const routes = [
    {path: '', component: Login, pathMatch: 'full'}
];

@NgModule({
    declarations: [
        Login
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [MessageBusService]
})
export default class LoginModule {
    static routes = routes;
}
