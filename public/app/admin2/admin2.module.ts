import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { Admin2 } from './admin2.component';
import { SharedModule } from '../shared/shared.module';

import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Admin2, pathMatch: 'full', canActivate: [AppAuth] }
];


@NgModule({
  imports: [ SharedModule, CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Admin2 ]
})
export default class Admin2Module {
  static routes = routes;
}
