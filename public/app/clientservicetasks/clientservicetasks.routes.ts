import { Routes, RouterModule }  from '@angular/router';

import { ClientServiceTasksComponent } from './clientservicetasks.component';
import { ClientServiceTaskDetailComponent } from './detail/clientservicetask-detail.component';
import { ClientServiceTaskEditComponent } from './edit/clientservicetask-edit.component';

import { AppGuard } from '../app.guard';

const routes: Routes = [
    // {path: 'detail/:id',
    //     component: ClientServiceTaskDetailComponent,
    //     pathMatch: 'full',
    //     canActivate: [AppGuard]},
    {path: 'edit/:id',
        component: ClientServiceTaskEditComponent,
        pathMatch: 'full',
        canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
