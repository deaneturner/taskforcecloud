import { Routes, RouterModule }  from '@angular/router';

import { ServiceItemsComponent } from './serviceitems.component';
import { ServiceItemDetailComponent } from './detail/service-item-detail.component';
import { ServiceItemEditComponent } from './edit/service-item-edit.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    {path: 'detail/:id',
        component: ServiceItemDetailComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ServiceItemEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
