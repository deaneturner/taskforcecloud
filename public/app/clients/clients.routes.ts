import { Routes, RouterModule }  from '@angular/router';

import { ClientsComponent } from './clients.component';
import { AppGuard } from '../app.guard';

const routes: Routes = [
    {path: '', component: ClientsComponent, pathMatch: 'full', canActivate: [AppGuard]}

];

export const ROUTES = RouterModule.forChild(routes);
