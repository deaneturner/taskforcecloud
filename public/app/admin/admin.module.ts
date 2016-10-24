import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { Admin } from './admin.component';
import { ListComponent } from '../common/list/list.component';
import { ListWidget } from '../common/list/list.widget';

import { AppAuth } from '../app.auth';

export const routes = [
  { path: '', component: Admin, pathMatch: 'full', canActivate: [AppAuth] }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ Admin, ListComponent, ListWidget ]
})
export default class AdminModule {
  static routes = routes;
}
