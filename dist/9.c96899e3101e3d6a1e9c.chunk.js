webpackJsonp([9],{1061:function(n,e,t){"use strict";var o=t(1),a=t(454),s=function(){function DashboardComponent(n){this.appConfig=n.getConfig()}return DashboardComponent.prototype.ngOnInit=function(){var n=new Date;this.month=n.getMonth()+1,this.year=n.getFullYear()},DashboardComponent=__decorate([o.Component({selector:"dashboard",template:t(1095),styles:[t(1084)],encapsulation:o.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof a.AppConfig&&a.AppConfig)&&n||Object])],DashboardComponent);var n}();e.DashboardComponent=s},1062:function(n,e,t){"use strict";var o=t(1),a=t(85),s=t(100),i=t(1061),d=t(1075),l=t(455);e.routes=[{path:"",component:i.DashboardComponent,pathMatch:"full",canActivate:[l.AppGuard]}];var r=function(){function DashboardModule(){}return DashboardModule.routes=e.routes,DashboardModule=__decorate([o.NgModule({imports:[a.CommonModule,s.RouterModule.forChild(e.routes)],declarations:[i.DashboardComponent,d.Widget]}),__metadata("design:paramtypes",[])],DashboardModule)}();Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},1075:function(n,e,t){"use strict";(function(n){var o=t(1),a=function(){function Widget(e){this.$el=n(e.nativeElement),n.fn.widgster.Constructor.DEFAULTS.bodySelector=".widget-body",n(document).on("close.widgster",function(e){var t=n(e.target).closest('.content > .row > [class*="col-"]:not(.widget-container)');t.find(".widget").not(e.target).length||t.remove()})}return Widget.prototype.ngOnInit=function(){this.$el.widgster()},Widget=__decorate([o.Directive({selector:"[widget]"}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.ElementRef&&o.ElementRef)&&e||Object])],Widget);var e}();e.Widget=a}).call(e,t(86))},1084:function(n,e){n.exports=""},1095:function(n,e){n.exports='<h1 class="page-title">Dashboard\n    <small>\n        <small>...</small>\n    </small>\n</h1>\n<div class="row">\n    <div class="col-lg-3 col-md-6 col-xs-12">\n        <section class="widget bg-primary text-white">\n            <div class="widget-body clearfix">\n                <div class="row flex-nowrap">\n                    <div class="col-xs-3">\n            <span class="widget-icon">\n              <i class="glyphicon glyphicon-globe"></i>\n            </span>\n                    </div>\n                    <div class="col-xs-9">\n                        <h6 class="no-margin">TODAY\'S NOTIFICATIONS</h6>\n                        <p class="h2 no-margin fw-normal">+6</p>\n                    </div>\n                </div>\n                <div class="row flex-nowrap">\n                    <div class="col-xs-6">\n                        <h6 class="no-margin">Yesterday</h6>\n                        <p class="value5">+2</p>\n                    </div>\n                    <div class="col-xs-6">\n                        <h6 class="no-margin">Total</h6>\n                        <p class="value5">4</p>\n                    </div>\n                </div>\n            </div>\n        </section>\n    </div>\n</div>\n'}});