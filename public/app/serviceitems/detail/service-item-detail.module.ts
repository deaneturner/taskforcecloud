import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiceItemDetailComponent } from './service-item-detail.component';
import { PanelModule } from '../shared/panel/panel.module';

import { AppGuard } from '../app.guard';

export const routes = [
    {path: '', component: ServiceItemDetailComponent, pathMatch: 'full', canActivate: [AppGuard]}
];

@NgModule({
    imports: [PanelModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [ServiceItemDetailComponent]
})
export default class ServiceItemDetailModule {
    static routes = routes;
}
