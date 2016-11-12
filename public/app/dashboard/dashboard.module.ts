import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard.component.ts';
import {Widget} from '../layout/widget/widget.directive';
import { AppGuard } from '../app.guard';

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full', canActivate: [AppGuard] }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Dashboard, Widget ]
})
export default class DashboardModule {
  static routes = routes;
}
