import { Routes, RouterModule }  from '@angular/router';

import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './detail/client-detail.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientItemDetailComponent } from '../clientitems/detail/clientitem-detail.component';
import { ClientItemEditComponent } from '../clientitems/edit/clientitem-edit.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    {path: '',
        component: ClientsComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'detail/:id',
        component: ClientDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ClientEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {
        path: ':id/clientitems/detail/:clientitemid',
        component: ClientItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    },
    {
        path: ':id/clientitems/edit/:clientitemid',
        component: ClientItemEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]
    }

];

export const ROUTES = RouterModule.forChild(routes);
