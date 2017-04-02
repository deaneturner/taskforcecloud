import { Routes, RouterModule }  from '@angular/router';

import { ClientServicesComponent } from './clientservices.component';
import { ClientServiceDetailComponent } from './detail/clientservice-detail.component';
import { ClientServiceEditComponent } from './edit/clientservice-edit.component';
import {
    ClientServiceItemEditComponent
}
    from '../clientserviceitems/edit/clientservicetask-edit.component';
import {
    ClientServiceItemDetailComponent
}
    from '../clientserviceitems/detail/clientservicetask-detail.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    {path: '',
        component: ClientServicesComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'detail/:id',
        component: ClientServiceDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ClientServiceEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {
        path: ':id/clientserviceitems/:clientserviceitemid',
        component: ClientServiceItemEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    },
    {
        path: ':id/clientserviceitems/detail/:clientserviceitemid',
        component: ClientServiceItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }

];

export const ROUTES = RouterModule.forChild(routes);
