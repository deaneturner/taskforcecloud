import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-modal';

import { ROUTES }       from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';
import { ChatSidebar } from './chat-sidebar/chat-sidebar.component';
import { ChatMessage } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationLoad } from './notifications/notifications-load.directive';
import { Notifications } from './notifications/notifications.component';
import { ModalComponent } from '../shared/modal-window/modal.component';
import { MessageBusService } from '../services/message.bus.service';
import { UserService } from '../services/user.service';
import { ClientService } from '../services/client.service';

@NgModule({
    imports: [CommonModule, TooltipModule, ROUTES, FormsModule, ModalModule],
    declarations: [Layout,
        Sidebar,
        Navbar,
        ChatSidebar, SearchPipe, Notifications, NotificationLoad, ChatMessage, ModalComponent],
    providers: [MessageBusService, UserService, ClientService]
})
export default class LayoutModule {
}
