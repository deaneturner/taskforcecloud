import { Routes, RouterModule }  from '@angular/router';

import { ClientServiceItemsComponent } from './clientserviceitems.component';
import { ClientServiceItemDetailComponent } from './detail/clientservice-item-detail.component';
import { ClientServiceItemEditComponent } from './edit/clientservice-item-edit.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    {path: 'detail/:id',
        component: ClientServiceItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ClientServiceItemEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
