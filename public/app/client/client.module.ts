import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { Client } from './client.component';
import { ListModule } from '../shared/list/list.module';

import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Client, pathMatch: 'full', canActivate: [AppAuth] }
];

@NgModule({
  imports: [ ListModule, CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Client ]
})
export default class Admin2Module {
  static routes = routes;
}
