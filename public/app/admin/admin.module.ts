import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { Admin } from './admin.component';
import { SharedModule } from '../shared/shared.module';

import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Admin, pathMatch: 'full', canActivate: [AppAuth] }
];


@NgModule({
  imports: [ SharedModule, CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Admin ]
})
export default class AdminModule {
  static routes = routes;
}
