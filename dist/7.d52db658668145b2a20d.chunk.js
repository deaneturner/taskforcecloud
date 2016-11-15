webpackJsonp([7],{710:function(n,e,t){"use strict";var a=t(0),s=function(){function PanelComponent(){this.collapsed=!1,this.showReload=!1,this.showClose=!1,this.showFullscreen=!0,this.showDropdown=!1}return PanelComponent.prototype.ngOnInit=function(){},__decorate([a.Input(),__metadata("design:type",String)],PanelComponent.prototype,"title",void 0),__decorate([a.Input(),__metadata("design:type",Array)],PanelComponent.prototype,"iconClass",void 0),__decorate([a.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"collapsed",void 0),__decorate([a.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showReload",void 0),__decorate([a.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showClose",void 0),__decorate([a.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showFullscreen",void 0),__decorate([a.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showDropdown",void 0),PanelComponent=__decorate([a.Component({selector:"tfc-panel",template:t(714),encapsulation:a.ViewEncapsulation.None,styles:[t(713)]}),__metadata("design:paramtypes",[])],PanelComponent)}();e.PanelComponent=s},711:function(n,e,t){"use strict";(function(n){var a=t(0),s=function(){function PanelDirective(){}return PanelDirective.prototype.render=function(){n.fn.widgster.Constructor.DEFAULTS.bodySelector=".widget-body";var e=n(".widget"),t=n("#panel-widget");e.on("fullscreen.widgster",function(){n(".content-wrap").css({"-webkit-transform":"none","-ms-transform":"none",transform:"none",margin:0,"z-index":2}),n(".widget-container").sortable("option","disabled",!0)}).on("restore.widgster closed.widgster",function(){n(".content-wrap").css({"-webkit-transform":"","-ms-transform":"",transform:"",margin:"","z-index":""}),n("body").css({"overflow-y":"scroll"}),n(".widget-container").sortable("option","disabled",!1)}),t.widgster({loaderTemplate:'<div class="loader animated fadeIn">   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span></div>',collapsed:this.collapsed}),e.widgster()},PanelDirective.prototype.ngOnInit=function(){this.render()},__decorate([a.Input(),__metadata("design:type",Boolean)],PanelDirective.prototype,"collapsed",void 0),PanelDirective=__decorate([a.Directive({selector:"[panel-widget]"}),__metadata("design:paramtypes",[])],PanelDirective)}();e.PanelDirective=s}).call(e,t(86))},712:function(n,e,t){"use strict";var a=t(0),s=t(73),o=t(710),i=t(711),l=function(){function PanelModule(){}return PanelModule=__decorate([a.NgModule({imports:[s.CommonModule],declarations:[o.PanelComponent,i.PanelDirective],exports:[o.PanelComponent,i.PanelDirective]}),__metadata("design:paramtypes",[])],PanelModule)}();e.PanelModule=l},713:function(n,e){n.exports=""},714:function(n,e){n.exports='<div panel-widget [collapsed]="collapsed">\n    <div class="widget-container">\n        <section class="widget" widget id="panel-widget"\n                 data-widgster-load="assets/demo/grid/shares.php"\n                 data-post-processing="true">\n            <header>\n                <h6>\n                    <span *ngIf="iconClass && iconClass.length" class="tag tag-primary"><i class="glyphicon"\n                                                                                           [ngClass]="iconClass"></i></span>\n                    <span class="fw-semi-bold">{{title}}</span>\n                </h6>\n                <div>\n                    <div [style.visibility]="showDropdown ? \'hidden\' : \'visible\'" class="widget-controls">\n                        <a *ngIf="showReload" data-gster="load" title="Reload" href="#"><i\n                                class="fa fa-refresh"></i></a>\n                        <a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a>\n                        <a data-widgster="collapse" title="Collapse" href="#"><i\n                                class="glyphicon glyphicon-chevron-down"></i></a>\n                        <a data-widgster="fullscreen" title="Full Screen" href="#"><i\n                                class="glyphicon glyphicon-fullscreen"></i></a>\n                        <a data-widgster="restore" title="Restore" href="#"><i\n                                class="glyphicon glyphicon-resize-small"></i></a>\n                        <a *ngIf="showClose" data-widgster="close" title="Close" href="#"><i\n                                class="glyphicon glyphicon-remove"></i></a>\n                    </div>\n                    <div *ngIf="showDropdown" class="widget-controls dropdown" data-dropdown\n                         data-ng-init="isOpen = false"\n                         data-is-open="isOpen">\n                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n                            <i class="fa fa-bars"></i>\n                        </a>\n                        <ul class="dropdown-menu dropdown-menu-right">\n                            <li>\n                                <a class="dropdown-item">Edit</a>\n                            </li>\n                            <li class="dropdown-divider"></li>\n                            <li>\n                                <a class="dropdown-item">Delete</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </header>\n            <div class="widget-body no-padding">\n                <ng-content></ng-content>\n            </div>\n        </section>\n    </div>\n</div>\n'},759:function(n,e,t){"use strict";var a=t(0),s=t(406),o=function(){function UserDetailComponent(n){this.appConfig=n.getConfig()}return UserDetailComponent.prototype.ngOnInit=function(){this.panel={title:"Profile",collapsed:!1,close:!1,fullScreen:!1,showDropdown:!0}},UserDetailComponent=__decorate([a.Component({selector:"user-detail",template:t(853),styles:[t(837)],encapsulation:a.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof s.AppConfig&&s.AppConfig)&&n||Object])],UserDetailComponent);var n}();e.UserDetailComponent=o},760:function(n,e,t){"use strict";var a=t(0),s=t(406),o=function(){function UserEditComponent(n){this.appConfig=n.getConfig()}return UserEditComponent.prototype.ngOnInit=function(){},UserEditComponent=__decorate([a.Component({selector:"user-edit",template:t(854),styles:[t(838)],encapsulation:a.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof s.AppConfig&&s.AppConfig)&&n||Object])],UserEditComponent);var n}();e.UserEditComponent=o},828:function(n,e,t){"use strict";var a=t(0),s=t(73),o=t(759),i=t(760),l=t(712),r=t(829),p=function(){function UserModule(){}return UserModule=__decorate([a.NgModule({imports:[s.CommonModule,l.PanelModule,r.ROUTES],declarations:[o.UserDetailComponent,i.UserEditComponent]}),__metadata("design:paramtypes",[])],UserModule)}();Object.defineProperty(e,"__esModule",{value:!0}),e.default=p},829:function(n,e,t){"use strict";var a=t(87),s=t(759),o=t(760),i=t(408),l=[{path:"",children:[{path:":id",component:s.UserDetailComponent,pathMatch:"full",canActivate:[i.AppGuard]},{path:":id/:mode",component:o.UserEditComponent,pathMatch:"full",canActivate:[i.AppGuard]}]}];e.ROUTES=a.RouterModule.forChild(l)},837:function(n,e){n.exports='/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: "\\25cf";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row {\n  margin-bottom: 15px; }\n\n.stat-item {\n  display: inline-block;\n  padding-right: 15px; }\n  .stat-item + .stat-item {\n    padding-left: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1); }\n  .stat-item .name {\n    margin-bottom: 2px; }\n  .stat-item .value {\n    font-weight: bold; }\n  .stat-item.stat-item-mini-chart {\n    position: relative;\n    top: -12px;\n    padding-left: 0;\n    border-left: none; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n'},838:function(n,e){n.exports=""},853:function(n,e){n.exports='<ol class="breadcrumb">\n    <li class="breadcrumb-item">YOU ARE HERE</li>\n    <li class="active breadcrumb-item">User Detail</li>\n</ol>\n<h1 class="page-title">User - <span class="fw-semi-bold">Profile</span></h1>\n<div class="row user-detail">\n    <div class="col-lg-6 col-xs-12">\n        <tfc-panel [title]="panel.title" [collapsed]="panel.collapsed" [showFullscreen]="panel.fullScreen"\n                   [showDropdown]="panel.showDropdown">\n            <section class="widget">\n                <div class="widget-body">\n                    <div class="widget-top-overflow text-white">\n                        <div class="height-100 overflow-hidden">\n                            <!--<img class="img-fluid" src="assets/img/pictures/19.jpg">-->\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="col-md-5 col-xs-12 text-xs-center">\n                            <div class="post-user post-user-profile">\n              <span class="thumb-xlg">\n                <img class="img-circle" src="assets/img/avatar.png" alt="...">\n              </span>\n                                <h5 class="fw-normal">Adam <span class="fw-semi-bold">Johns</span></h5>\n                                <p>UI/UX designer</p>\n                                <a href="#" class="btn btn-danger btn-sm mt">\n                                    &nbsp;Send\n                                    <i class="fa fa-envelope ml-xs"></i>&nbsp;\n                                </a>\n                                <ul class="contacts">\n                                    <li><i class="fa fa-phone fa-fw mr-xs"></i><a href="#"> +375 29 555-55-55</a></li>\n                                    <li><i class="fa fa-envelope fa-fw mr-xs"></i><a href="#"> psmith@example.com</a>\n                                    </li>\n                                    <li><i class="fa fa-map-marker fa-fw mr-xs"></i><a href="#"> Minsk, Belarus</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class="col-md-7 col-xs-12">\n                            <div class="stats-row stats-row-profile mt text-xs-right">\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">251</p>\n                                    <h6 class="name">Posts</h6>\n                                </div>\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">9.38%</p>\n                                    <h6 class="name">Conversion</h6>\n                                </div>\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">842</p>\n                                    <h6 class="name">Followers</h6>\n                                </div>\n                            </div>\n                            <p class="text-xs-right mt-lg">\n                                <a href="#" class="tag tag-warning"> UI/UX </a>\n                                <a href="#" class="tag tag-danger ml-xs"> Web Design </a>\n                                <a href="#" class="tag tag-default ml-xs"> Mobile Apps </a>\n                            </p>\n                            <p class="lead mt-lg">\n                                My name is Adam Johns and here is my new Sing user profile page.\n                            </p>\n                            <p>\n                                I love reading people\'s summaries page especially those who are in the same industry as\n                                me.\n                                Sometimes it\'s much easier to find your concentration during the night.\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </tfc-panel>\n    </div>\n    <div class="col-lg-6 col-xs-12">\n        <section class="activities">\n            <h2 class="m-l-1">Activities</h2>\n            <section class="event">\n        <span class="thumb-sm avatar pull-left mr-sm">\n          <img class="img-circle" src="assets/img/people/a5.jpg" alt="...">\n        </span>\n                <h5 class="event-heading"><a href="#">Bob Nilson</a>\n                    <small><a href="#">@nils</a></small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    There is no such thing as maturity. There is instead an ever-evolving process of maturing.\n                    Because when there is a maturity, there is ...\n                </p>\n                <footer>\n                    <ul class="post-links">\n                        <li><a href="#">1 hour</a></li>\n                        <li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li>\n                        <li><a href="#">Comment</a></li>\n                    </ul>\n                </footer>\n            </section>\n            <section class="event">\n                <h5 class="event-heading"><a href="#">Jessica Smith</a>\n                    <small>@jess</small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\n                    my brand new HDD 40TB. Thanks god I found it!\n                </p>\n                <footer>\n                    <div class="clearfix">\n                        <ul class="post-links mt-sm pull-left">\n                            <li><a href="#">1 hour</a></li>\n                            <li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li>\n                            <li><a href="#">Comment</a></li>\n                        </ul>\n\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#">\n                <img class="img-circle" src="assets/img/people/a1.jpg">\n              </a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a5.jpg"></a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a3.jpg"></a>\n            </span>\n                    </div>\n                    <ul class="post-comments mt-sm">\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/people/a1.jpg" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <h6 class="author fs-sm fw-semi-bold">Ignacio Abad\n                                    <small>6 mins ago</small>\n                                </h6>\n                                <p>Hey, have you heard anything about that?</p>\n                            </div>\n                        </li>\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/avatar.png" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <input class="form-control form-control-sm" type="text"\n                                       placeholder="Write your comment...">\n                            </div>\n                        </li>\n                    </ul>\n                </footer>\n            </section>\n            <form class="mt" action="#">\n                <div class="form-group mb-0">\n                    <label class="sr-only" for="new-event">New event</label>\n                    <textarea class="form-control" id="new-event" placeholder="Post something..." rows="3"></textarea>\n                </div>\n                <div class="btn-toolbar">\n                    <div class="btn-group">\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-camera fa-lg"></i>\n                        </a>\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-map-marker fa-lg"></i>\n                        </a>\n                    </div>\n                    <button type="submit" class="btn btn-danger btn-sm pull-right">Post</button>\n                </div>\n            </form>\n        </section>\n    </div>\n</div>\n'},854:function(n,e){n.exports='<h1 class="page-title">User Edit\n    <small>\n        <small>...</small>\n    </small>\n</h1>'}});