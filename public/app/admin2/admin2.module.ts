import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { Admin2 } from './admin2.component';
import { ListModule } from '../shared/list/list.module';

import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Admin2, pathMatch: 'full', canActivate: [AppAuth] }
];

@NgModule({
  imports: [ ListModule, CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Admin2 ]
})
export default class Admin2Module {
  static routes = routes;
}
