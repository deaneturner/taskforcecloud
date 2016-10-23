import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard.component.ts';
import { GridDemo } from '../common/list/grid-demo/grid-demo';
import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full', canActivate: [AppAuth] }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Dashboard, GridDemo ]
})
export default class DashboardModule {
  static routes = routes;
}
