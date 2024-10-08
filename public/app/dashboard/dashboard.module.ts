import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component.ts';
import { WidgetDirective } from '../layout/widget/widget.directive';
import { AppGuard } from '../app.guard';

export const routes = [
    {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AppGuard]}
];


@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [DashboardComponent, WidgetDirective]
})
export default class DashboardModule {
    static routes = routes;
}
