webpackJsonp([8],{758:function(e,t,n){"use strict";var a=n(0),o=n(403),s=function(){function Dashboard(e){this.config=e.getConfig()}return Dashboard.prototype.ngOnInit=function(){var e=new Date;this.month=e.getMonth()+1,this.year=e.getFullYear()},Dashboard=__decorate([a.Component({selector:"dashboard",template:n(784),styles:[n(778)],encapsulation:a.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.AppConfig&&o.AppConfig)&&e||Object])],Dashboard);var e}();t.Dashboard=s},759:function(e,t,n){"use strict";var a=n(0),o=n(73),s=n(87),i=n(758),r=n(773),l=n(404);t.routes=[{path:"",component:i.Dashboard,pathMatch:"full",canActivate:[l.AppAuth]}];var d=function(){function DashboardModule(){}return DashboardModule.routes=t.routes,DashboardModule=__decorate([a.NgModule({imports:[o.CommonModule,s.RouterModule.forChild(t.routes)],declarations:[i.Dashboard,r.Widget]}),__metadata("design:paramtypes",[])],DashboardModule)}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=d},773:function(e,t,n){"use strict";(function(e){var a=n(0),o=function(){function Widget(t){this.$el=e(t.nativeElement),e.fn.widgster.Constructor.DEFAULTS.bodySelector=".widget-body",e(document).on("close.widgster",function(t){var n=e(t.target).closest('.content > .row > [class*="col-"]:not(.widget-container)');n.find(".widget").not(t.target).length||n.remove()})}return Widget.prototype.ngOnInit=function(){this.$el.widgster()},Widget=__decorate([a.Directive({selector:"[widget]"}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.ElementRef&&a.ElementRef)&&t||Object])],Widget);var t}();t.Widget=o}).call(t,n(86))},778:function(e,t){e.exports=""},784:function(e,t){e.exports='<h1 class="page-title">Dashboard <small><small>The Lucky One</small></small></h1>\n\n<div class="row">\n  <div class="col-md-6">\n    <section widget class="widget">\n      <header>\n        <h4>\n          Example <span class="fw-semi-bold">Widget</span>\n        </h4>\n        <div class="widget-controls">\n          <a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a>\n          <a data-widgster="collapse" title="Collapse" href="#"><i class="glyphicon glyphicon-chevron-down"></i></a>\n          <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a>\n        </div>\n      </header>\n      <div class="widget-body">\n        <img class="pull-left mr-sm" src="assets/img/a2.png" alt="Angular 2.0" width="100">\n        <p class="lead">You are looking at a completely new version of the Task Force Cloud App built\n          with brand new <strong>Angular <em>2.0</em> Final Release</strong></p>\n        <p class="fs-mini">Made by <a href="http://taskforcecloud.com" target="_blank">Task Force Cloud</a>.</p>\n      </div>\n    </section>\n  </div>\n</div>\n'}});