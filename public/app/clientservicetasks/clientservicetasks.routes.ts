import { Routes, RouterModule }  from '@angular/router';

import { ClientServiceItemsComponent } from './clientservicetasks.component';
import { ClientServiceItemDetailComponent } from './detail/clientservicetask-detail.component';
import { ClientServiceItemEditComponent } from './edit/clientservicetask-edit.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    // {path: 'detail/:id',
    //     component: ClientServiceItemDetailComponent,
    //     pathMatch: 'full',
    //     canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ClientServiceItemEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
