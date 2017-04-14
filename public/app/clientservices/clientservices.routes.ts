import { Routes, RouterModule }  from '@angular/router';

import { ClientServicesComponent } from './clientservices.component';
import { ClientServiceDetailComponent } from './detail/clientservice-detail.component';
import { ClientServiceEditComponent } from './edit/clientservice-edit.component';
import {
    ClientServiceTaskEditComponent
}
    from '../clientservicetasks/edit/clientservicetask-edit.component';
import {
    ClientServiceTaskDetailComponent
}
    from '../clientservicetasks/detail/clientservicetask-detail.component';

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
        path: ':id/clientservicetasks/edit/:clientservicetaskid',
        component: ClientServiceTaskEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    },
    {
        path: ':id/clientservicetasks/detail/:clientservicetaskid',
        component: ClientServiceTaskDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }

];

export const ROUTES = RouterModule.forChild(routes);
