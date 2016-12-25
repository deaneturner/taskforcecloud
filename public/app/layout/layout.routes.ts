import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '', component: Layout, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module')},
        {path: 'admin', loadChildren: () => System.import('../admin/admin.module')},
        {path: 'clients', loadChildren: () => System.import('../clients/client.module')},
        {path: 'grid', loadChildren: () => System.import('../grid/grid.module')},
        {path: 'users', loadChildren: () => System.import('../users/users.module.ts')}
    ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
