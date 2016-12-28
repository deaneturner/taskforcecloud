import { Routes, RouterModule }  from '@angular/router';

import { ClientServicesComponent } from './client-services.component';
import { ClientServiceDetailComponent } from './detail/client-service-detail.component';
import { ClientServiceEditComponent } from './edit/client-service-edit.component';

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
        canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
