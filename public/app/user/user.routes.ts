import {Routes, RouterModule}  from '@angular/router';

import {UserDetailComponent} from './detail/user-detail.component';
import {UserEditComponent} from './edit/user-edit.component';
import {AppGuard} from '../app.guard';

const routes: Routes = [
    {
        path: '', children: [
        {path: ':id', component: UserDetailComponent, pathMatch: 'full', canActivate: [AppGuard]},
        {path: ':id/:mode', component: UserEditComponent, pathMatch: 'full', canActivate: [AppGuard]}
    ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
