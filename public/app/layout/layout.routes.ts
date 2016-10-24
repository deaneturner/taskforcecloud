import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'admin', loadChildren: () => System.import('../admin/admin.module') },
    { path: 'grid', loadChildren: () => System.import('../grid/grid.module') },
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
