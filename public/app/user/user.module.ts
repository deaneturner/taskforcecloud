import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {UserDetailComponent} from './detail/user-detail.component';
import {UserEditComponent} from './edit/user-edit.component';
import {PanelModule} from '../shared/panel/panel.module';
import { ModalModule } from 'ng2-modal';

import {ROUTES}       from './user.routes';

@NgModule({
    imports: [CommonModule, PanelModule, ModalModule, ROUTES],
    declarations: [UserDetailComponent, UserEditComponent]
})

export default class UserModule {
}
