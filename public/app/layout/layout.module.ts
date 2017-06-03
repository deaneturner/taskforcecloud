import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-modal';

import { ROUTES }       from './layout.routes';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatMessageComponent } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationLoad } from './notifications/notifications-load.directive';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModalComponent } from '../shared/modal-window/modal.component';
import { MessageBusService } from '../services/message.bus.service';
import { UserService } from '../services/user.service';

@NgModule({
    imports: [CommonModule, TooltipModule, ROUTES, FormsModule, ModalModule],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        NavbarComponent,
        ChatSidebarComponent,
        SearchPipe,
        NotificationsComponent,
        NotificationLoad,
        ChatMessageComponent,
        ModalComponent],
    providers: [MessageBusService, UserService]
})
export default class LayoutModule {
}
