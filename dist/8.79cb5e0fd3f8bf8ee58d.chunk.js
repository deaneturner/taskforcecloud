webpackJsonp([8],{665:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(58),i=t(670),o=t(671),r=function(){function PanelModule(){}return PanelModule}();r=__decorate([s.NgModule({imports:[a.CommonModule],declarations:[i.PanelComponent,o.PanelDirective],exports:[i.PanelComponent,o.PanelDirective]})],r),n.PanelModule=r},670:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=function(){function PanelComponent(){this.collapsible=!1,this.collapsed=!1,this.showReload=!1,this.showClose=!1,this.showFullscreen=!1,this.menu=[],this.showDropdown=!1,this.chevron={collapsed:this.collapsed,toggle:function(){this.collapsed=!this.collapsed}}}return PanelComponent.prototype.ngOnInit=function(){this.menu&&this.menu.length>0?this.showDropdown=!0:this.showDropdown=!1},PanelComponent}();__decorate([s.Input(),__metadata("design:type",String)],a.prototype,"title",void 0),__decorate([s.Input(),__metadata("design:type",Array)],a.prototype,"iconClass",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"collapsible",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"collapsed",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"showReload",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"showClose",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"showFullscreen",void 0),__decorate([s.Input(),__metadata("design:type",Array)],a.prototype,"menu",void 0),a=__decorate([s.Component({selector:"tfc-cmp-panel",template:t(673),encapsulation:s.ViewEncapsulation.None,styles:[t(672)]})],a),n.PanelComponent=a},671:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=function(){function PanelDirective(){}return PanelDirective.prototype.render=function(){e.fn.widgster.Constructor.DEFAULTS.bodySelector=".widget-body";var n=e(".widget"),t=e("#tfcDirPanelWidget");n.on("fullscreen.widgster",function(){e(".content-wrap").css({"-webkit-transform":"none","-ms-transform":"none",transform:"none",margin:0,"z-index":2}),e(".widget-container").sortable("option","disabled",!0)}).on("restore.widgster closed.widgster",function(){e(".content-wrap").css({"-webkit-transform":"","-ms-transform":"",transform:"",margin:"","z-index":""}),e("body").css({"overflow-y":"scroll"}),e(".widget-container").sortable("option","disabled",!1)}),t.widgster({loaderTemplate:'<div class="loader animated fadeIn">   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span></div>',collapsed:this.collapsed}),n.widgster()},PanelDirective.prototype.ngOnInit=function(){this.render()},PanelDirective}();__decorate([s.Input(),__metadata("design:type",Boolean)],a.prototype,"collapsed",void 0),a=__decorate([s.Directive({selector:"[tfcDirPanelWidget]"})],a),n.PanelDirective=a}).call(n,t(53))},672:function(e,n){e.exports='.tfc-cmp-panel-icon {\n  margin-right: 10px; }\n\n.tfc-cmp-panel-collapsible-spacer {\n  padding: 5px 20px;\n  border-bottom-left-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n  background-color: #eee; }\n  .tfc-cmp-panel-collapsible-spacer::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .tfc-cmp-panel-collapsible-spacer .thumb {\n    margin-left: 10px; }\n\n.tfc-cmp-panel-collapsible .widget-body {\n  border-left: 10px solid #eee; }\n\n.tfc-cmp-panel-collapsible-spacer {\n  display: none; }\n\n.tfc-cmp-panel-collapsible .tfc-cmp-panel-collapsible-spacer {\n  display: block; }\n'},673:function(e,n){e.exports='<div tfcDirPanelWidget class="tfc-cmp-panel" [collapsed]="collapsed">\n    <div class="widget-container">\n        <section class="widget" widget id="panel-widget">\n            <header>\n                <h6 data-widgster="collapse">\n                    <span *ngIf="iconClass && iconClass.length" class="tag tag-primary tfc-cmp-panel-icon">\n                        <i class="fa" [ngClass]="iconClass"></i></span>\n                    <span class="fw-semi-bold">{{title}}</span>\n                </h6>\n                <h6 data-widgster="expand">\n                    <span *ngIf="iconClass && iconClass.length" class="tag tag-primary tfc-cmp-panel-icon">\n                        <i class="fa" [ngClass]="iconClass"></i></span>\n                    <span class="fw-semi-bold">{{title}}</span>\n                </h6>\n                <div>\n                    <div class="widget-controls">\n                        <span [hidden]="!showDropdown" class="dropdown" data-dropdown data-ng-init="isOpen = false"\n                              data-is-open="isOpen">\n                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n                                <i class="fa fa-bars"></i>\n                            </a>\n                            <ul class="dropdown-menu dropdown-menu-right">\n                                <li *ngFor="let menuItem of menu; let last = last">\n                                    <a class="dropdown-item" (click)="menuItem.onMenuSelect()">{{menuItem.title}}</a>\n                                    <div *ngIf="!last" class="dropdown-divider"></div>\n                                </li>\n                            </ul>\n                        </span>\n                        <a [hidden]="!showReload" data-gster="load" title="Reload" href="#"><i\n                                class="fa fa-refresh"></i></a>\n                        <a [hidden]="!collapsible" data-widgster="expand" title="Expand" href="#">\n                            <i class="glyphicon glyphicon-chevron-up" ></i></a>\n                        <a [hidden]="!collapsible" data-widgster="collapse" title="Collapse" href="#"><i\n                                class="glyphicon glyphicon-chevron-down"></i></a>\n                        <a [hidden]="!showFullscreen" data-widgster="fullscreen" title="Full Screen" href="#"><i\n                                class="glyphicon glyphicon-fullscreen"></i></a>\n                        <a data-widgster="restore" title="Restore" href="#"><i\n                                class="glyphicon glyphicon-resize-small"></i></a>\n                        <a *ngIf="showClose" data-widgster="close" title="Close" href="#"><i\n                                class="glyphicon glyphicon-remove"></i></a>\n                    </div>\n                </div>\n            </header>\n            <div class="widget-body no-padding">\n                <div class="tfc-cmp-panel-collapsible-spacer"></div>\n                <ng-content></ng-content>\n            </div>\n        </section>\n    </div>\n</div>\n'},693:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(96),i=t(52),o=t(239),r=t(135),l=t(97),c=function(){function UserEditComponent(e,n,t,s,a){this.appState=e,this.router=n,this.messageBusService=t,this.activatedRoute=s,this.userService=a,this.user={},this.formErrors={email:[],password:[],confirmPassword:[]},this.validationMessages={email:{required:"E-mail is required.",pattern:"E-mail must be formatted as as an email address."},password:{required:"Password is required.",tfcDirValidateEqual:"Password and Confirm Password must match.",pattern:"Length must be between 8 and 32 characters and contain [one or more uppercase letters], [one or more lowercase letters], and [one or more numbers]."},confirmPassword:{required:"Confirmation of password is required.",tfcDirValidateEqual:"Password and Confirm Password must match."}}}return UserEditComponent.prototype.ngOnInit=function(){var e=this;this.activatedRoute.params.subscribe(function(n){var t=e.userService.cacheManager.getCache("cachedUserObservable")||{};n.id!==t._id?e.userService.getUser(n.id).subscribe(function(n){e.user=n,e.userService.cacheManager.setCache("cachedUserObservable",n)},function(e){}):t&&(e.user=t)})},UserEditComponent.prototype.updateUser=function(e,n){var t=this,s=this;e&&(delete n.password,this.userService.updateUser(this.user._id,n).subscribe(function(e){if(e.success)s.appState.get("currentUser")._id===e.data._id&&t.messageBusService.publishCurrentUser(e.data),s.router.navigate(["/app/users/detail",s.user._id]);else if(e.success===!1){var n=e.field;s.formErrors[n]=[],s.formErrors[n].push(s.validationMessages[n][e.msgKey])}},function(e){}))},UserEditComponent.prototype.cancel=function(e){e.preventDefault(),e.stopPropagation(),this.user._id?this.userService.cacheManager.selectUser(["/app/users/detail/",this.user._id]):this.router.navigate(["/app/users"])},UserEditComponent.prototype.ngAfterViewChecked=function(){this.formChanged()},UserEditComponent.prototype.formChanged=function(){var e=this;this.currentForm!==this.userForm&&(this.userForm=this.currentForm,this.userForm&&this.userForm.valueChanges.subscribe(function(n){return e.onValueChanged(n)}))},UserEditComponent.prototype.onValueChanged=function(e){if(this.userForm){var n=this.userForm.form;for(var t in this.formErrors)if(t){this.formErrors[t]=[];var s=n.get(t);if(s&&s.dirty&&!s.valid){var a=this.validationMessages[t];for(var i in s.errors)i&&this.formErrors[t].push(a[i])}}}},UserEditComponent}();__decorate([s.ViewChild("userForm"),__metadata("design:type",a.NgForm)],c.prototype,"currentForm",void 0),c=__decorate([s.Component({template:t(996),styles:[t(968)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",[l.AppState,i.Router,o.MessageBusService,i.ActivatedRoute,r.UserService])],c),n.UserEditComponent=c},694:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(135),i=function(){function UserListComponent(e){this.userService=e}return UserListComponent.prototype.ngOnInit=function(){this.getUsers()},UserListComponent.prototype.getUsers=function(){var e=this;this.userService.getUsers().subscribe(function(n){return e.users=n},function(e){})},UserListComponent}();__decorate([s.Input(),__metadata("design:type",Object)],i.prototype,"iconClass",void 0),i=__decorate([s.Component({selector:"tfc-cmp-user-list",template:t(703),styles:[t(699)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",[a.UserService])],i),n.UserListComponent=i},695:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(58),i=t(52),o=t(694),r=function(){function UserListModule(){}return UserListModule}();r=__decorate([s.NgModule({imports:[a.CommonModule,i.RouterModule],declarations:[o.UserListComponent],exports:[o.UserListComponent]})],r),n.UserListModule=r},699:function(e,n){e.exports=""},703:function(e,n){e.exports='<div class="list-group list-group-lg">\n    <a *ngFor="let user of users" class="list-group-item" (click)="userService.cacheManager.selectUser([\'/app/users/detail/\', user._id])">\n        <span class="thumb-sm pull-xs-left mr">\n                    <i class="fa" [ngClass]="iconClass"></i>\n                </span>\n        <!--<i class="fa fa-circle pull-xs-right mt-sm" [ngClass]="user.indicatorClass"></i>-->\n        <h6 class="no-margin pull-xs-right">{{ user.role || \'\'}}</h6>\n        <h6 class="no-margin">{{ user.username || \'\'}}</h6>\n        <small class="text-muted">{{ user.firstName }} {{ user.lastName }}</small>\n    </a>\n</div>\n'},854:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(52),i=t(97),o=t(134),r=t(135),l=t(693),c=function(){function UserDetailComponent(e,n,t,s,a){this.appState=e,this.router=n,this.notificationService=t,this.userService=s,this.activatedRoute=a,this.iconClass=["fa","fa-user-o"],this.user={}}return UserDetailComponent.prototype.ngOnInit=function(){var e=this,n=this;this.panel={title:"Profile",menu:[{title:"Edit",onMenuSelect:function(){return e.onMenuSelect("edit")}},{title:"Delete",onMenuSelect:function(){return e.onMenuSelect("delete")}}]},this.activatedRoute.params.subscribe(function(e){var t=n.userService.cacheManager.getCache("cachedUserObservable")||{};e.id!==t._id?n.userService.getUser(e.id).subscribe(function(e){n.user=e,n.userService.cacheManager.setCache("cachedUserObservable",e)},function(e){}):t&&(n.user=t)})},UserDetailComponent.prototype.onMenuSelect=function(e){var n=this;switch(e){case"edit":this.userService.cacheManager.selectUser(["/app/users/edit/",this.user._id]);break;case"delete":this.appState.get("currentUser")._id===this.user._id?this.notificationService.showModal({title:"Cancel delete",subTitle:null,content:"Cannot delete the currently logged in user:",subContent:n.user.firstName+" "+n.user.lastName+" ("+n.user.username+")",buttons:[{title:"OK",onClick:function(e){n.notificationService.closeModal()},"class":"btn btn-success"}]}):this.notificationService.showModal({title:"Confirm Delete",subTitle:null,content:"Are you sure you want to delete user:",subContent:n.user.firstName+" "+n.user.lastName+" ("+n.user.username+")",buttons:[{title:"Cancel",onClick:function(e){n.notificationService.closeModal()},"class":"btn btn-gray"},{title:"Yes, delete",onClick:function(e){n.userService.deleteUser(n.activatedRoute.snapshot.params.id).subscribe(function(e){n.notificationService.displayMessage({message:"Deleted "+e.firstName+" "+e.lastName+" ("+e.username+")",type:"success"}),n.notificationService.closeModal(),n.router.navigate(["/app/users"])},function(e){})},"class":"btn btn-success"}]})}},UserDetailComponent}();__decorate([s.ViewChild(l.UserEditComponent),__metadata("design:type",l.UserEditComponent)],c.prototype,"userEditComponent",void 0),c=__decorate([s.Component({template:t(995),styles:[t(967)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",[i.AppState,a.Router,o.NotificationService,r.UserService,a.ActivatedRoute])],c),n.UserDetailComponent=c},944:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(8),a=t(58),i=t(96),o=t(854),r=t(693),l=t(695),c=t(665),d=t(135),p=t(945),m=function(){function UserModule(){}return UserModule}();m=__decorate([s.NgModule({imports:[a.CommonModule,l.UserListModule,c.PanelModule,i.FormsModule,p.ROUTES],declarations:[o.UserDetailComponent,r.UserEditComponent],providers:[d.UserService]})],m),n.default=m},945:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t(52),a=t(854),i=t(693),o=t(241),r=[{path:"detail/:id",component:a.UserDetailComponent,pathMatch:"full",canActivate:[o.AppGuard]},{path:"edit/:id",component:i.UserEditComponent,pathMatch:"full",canActivate:[o.AppGuard]}];n.ROUTES=s.RouterModule.forChild(r)},967:function(e,n){e.exports='/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: "\\25cf";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row {\n  margin-bottom: 15px; }\n\n.stat-item {\n  display: inline-block;\n  padding-right: 15px; }\n  .stat-item + .stat-item {\n    padding-left: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1); }\n  .stat-item .name {\n    margin-bottom: 2px; }\n  .stat-item .value {\n    font-weight: bold; }\n  .stat-item.stat-item-mini-chart {\n    position: relative;\n    top: -12px;\n    padding-left: 0;\n    border-left: none; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n'},968:function(e,n){e.exports=".user-form .form-control {\n  font-size: 13px;\n  background-color: #eeeeee; }\n  .user-form .form-control:focus {\n    background-color: #ddd; }\n"},995:function(e,n){e.exports='<ol class="breadcrumb">\n    <li class="breadcrumb-item" [routerLink]="[\'/app/admin\']"><i class="fa fa-cogs"></i> Administration > Users</li>\n    <li class="active breadcrumb-item">{{user.username}}</li>\n</ol>\n<!--<h1 class="page-title">Detail - <span class="fw-semi-bold">User</span></h1>-->\n<div class="row">\n    <div class="col-lg-6 col-xs-12">\n        <tfc-cmp-panel [menu]="panel.menu">\n            <section class="widget">\n                <div class="widget-body">\n                    <div class="widget-top-overflow text-white">\n                        <div class="height-100 overflow-hidden">\n                            <!--<img class="img-fluid" src="assets/img/pictures/19.jpg">-->\n                        </div>\n                    </div>\n                    <div class="row">\n                        <!--<div class="col-md-5 col-xs-12 text-xs-center">-->\n                        <div class="col-md-12 col-xs-12 text-xs-center">\n                            <div class="post-user post-user-profile">\n              <span class="thumb-xlg">\n                <i class="fa-5x" [ngClass]="iconClass"></i>\n              </span>\n                                <h5 class="fw-normal">{{user.firstName}} <span class="fw-semi-bold">{{user.lastName}}</span></h5>\n                                <div>{{user.username}}</div>\n                                <p>{{user.role}}</p>\n                                <a href="#" class="btn btn-danger btn-sm mt">\n                                    &nbsp;Send\n                                    <i class="fa fa-envelope ml-xs"></i>&nbsp;\n                                </a>\n                                <ul class="contacts">\n                                    <li><i class="fa fa-phone fa-fw mr-xs"></i><a href="#"> {{user.phone || \'(---) --- -----\'}}</a></li>\n                                    <li><i class="fa fa-envelope fa-fw mr-xs"></i><a href="#"> {{user.email || \'--- @ ---- . com\'}}</a>\n                                    </li>\n                                    <li><i class="fa fa-map-marker fa-fw mr-xs"></i><a href="#"> Minsk, Belarus</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <!--<div class="col-md-7 col-xs-12">-->\n                            <!--<div class="stats-row stats-row-profile mt text-xs-right">-->\n                                <!--<div class="stat-item">-->\n                                    <!--<p class="value text-xs-right">251</p>-->\n                                    <!--<h6 class="name">Posts</h6>-->\n                                <!--</div>-->\n                                <!--<div class="stat-item">-->\n                                    <!--<p class="value text-xs-right">9.38%</p>-->\n                                    <!--<h6 class="name">Conversion</h6>-->\n                                <!--</div>-->\n                                <!--<div class="stat-item">-->\n                                    <!--<p class="value text-xs-right">842</p>-->\n                                    <!--<h6 class="name">Followers</h6>-->\n                                <!--</div>-->\n                            <!--</div>-->\n                            <!--<p class="text-xs-right mt-lg">-->\n                                <!--<a href="#" class="tag tag-warning"> UI/UX </a>-->\n                                <!--<a href="#" class="tag tag-danger ml-xs"> Web Design </a>-->\n                                <!--<a href="#" class="tag tag-default ml-xs"> Mobile Apps </a>-->\n                            <!--</p>-->\n                            <!--<p class="lead mt-lg">-->\n                                <!--My name is Adam Johns and here is my new Sing user profile page.-->\n                            <!--</p>-->\n                            <!--<p>-->\n                                <!--I love reading people\'s summaries page especially those who are in the same industry as-->\n                                <!--me.-->\n                                <!--Sometimes it\'s much easier to find your concentration during the night.-->\n                            <!--</p>-->\n                        <!--</div>-->\n                    </div>\n                </div>\n            </section>\n        </tfc-cmp-panel>\n    </div>\n    <div class="col-lg-6 col-xs-12">\n        <section class="activities">\n            <h2 class="m-l-1">Activities</h2>\n            <section class="event">\n        <span class="thumb-sm avatar pull-left mr-sm">\n          <img class="img-circle" src="assets/img/people/a5.jpg" alt="...">\n        </span>\n                <h5 class="event-heading"><a href="#">Bob Nilson</a>\n                    <small><a href="#">@nils</a></small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    There is no such thing as maturity. There is instead an ever-evolving process of maturing.\n                    Because when there is a maturity, there is ...\n                </p>\n                <footer>\n                    <ul class="post-links">\n                        <li><a href="#">1 hour</a></li>\n                        <li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li>\n                        <li><a href="#">Comment</a></li>\n                    </ul>\n                </footer>\n            </section>\n            <section class="event">\n                <h5 class="event-heading"><a href="#">Jessica Smith</a>\n                    <small>@jess</small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\n                    my brand new HDD 40TB. Thanks god I found it!\n                </p>\n                <footer>\n                    <div class="clearfix">\n                        <ul class="post-links mt-sm pull-left">\n                            <li><a href="#">1 hour</a></li>\n                            <li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li>\n                            <li><a href="#">Comment</a></li>\n                        </ul>\n\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#">\n                <img class="img-circle" src="assets/img/people/a1.jpg">\n              </a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a5.jpg"></a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a3.jpg"></a>\n            </span>\n                    </div>\n                    <ul class="post-comments mt-sm">\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/people/a1.jpg" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <h6 class="author fs-sm fw-semi-bold">Ignacio Abad\n                                    <small>6 mins ago</small>\n                                </h6>\n                                <p>Hey, have you heard anything about that?</p>\n                            </div>\n                        </li>\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/avatar.png" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <input class="form-control form-control-sm" type="text"\n                                       placeholder="Write your comment...">\n                            </div>\n                        </li>\n                    </ul>\n                </footer>\n            </section>\n            <form class="mt" action="#">\n                <div class="form-group mb-0">\n                    <label class="sr-only" for="new-event">New event</label>\n                    <textarea class="form-control" id="new-event" placeholder="Post something..." rows="3"></textarea>\n                </div>\n                <div class="btn-toolbar">\n                    <div class="btn-group">\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-camera fa-lg"></i>\n                        </a>\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-map-marker fa-lg"></i>\n                        </a>\n                    </div>\n                    <button type="submit" class="btn btn-danger btn-sm pull-right">Post</button>\n                </div>\n            </form>\n        </section>\n    </div>\n</div>\n'},996:function(e,n){e.exports='<ol class="breadcrumb">\n    <li class="breadcrumb-item" [routerLink]="[\'/app/admin\']"><i class="fa fa-cogs"></i> Administration > Users</li>\n    <li class="active breadcrumb-item" [routerLink]="[\'/app/users/detail/\', user._id]">{{user.username}}</li>\n</ol>\n<!--<h1 class="page-title">Edit - <span class="fw-semi-bold">User</span></h1>-->\n<section class="widget" tfcDirWidget id="autoload-widget"\n         data-widgster-load="assets/demo/grid/autoload.php"\n         data-post-processing="true"\n         data-widgster-autoload="false"\n         data-widgster-show-loader="false">\n    <header></header>\n    <div class="widget-body">\n        <form class="user-form mt-lg" role="form" #userForm="ngForm" novalidate>\n            <div class="row">\n                <div class="col-lg-6 col-xs-12">\n                    <div class="form-group">\n                        <label for="firstName">First Name</label>\n                        <input class="form-control"\n                               type="text"\n                               id="firstName"\n                               name="firstName"\n                               placeholder="First Name"\n                               [(ngModel)]="user.firstName"\n                               required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.firstName">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                    <div class="form-group">\n                        <label for="lastName">Last Name</label>\n                        <input class="form-control"\n                               type="text"\n                               id="lastName"\n                               name="lastName"\n                               placeholder="Last Name"\n                               [(ngModel)]="user.lastName"\n                               required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.lastName">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                </div>\n                <div class="col-lg-6 col-xs-12">\n                    <div class="form-group">\n                        <label for="role">Role</label>\n                        <select class="form-control selectpicker"\n                                data-style="btn-danger btn-sm"\n                                data-width="auto"\n                                tabindex="-1"\n                                id="role"\n                                name="role"\n                                [(ngModel)]="user.role"\n                                required>\n                            <option value=""></option>\n                            <option value="Administrator">Administrator</option>\n                            <option value="Supervisor">Supervisor</option>\n                            <option value="Contributor">Contributor</option>\n                            <option value="Inactive">Inactive</option>\n                        </select>\n                    </div>\n                    <div class="form-group">\n                        <label for="email">E-mail</label>\n                        <input class="form-control"\n                               type="text"\n                               id="email"\n                               name="email"\n                               placeholder="E-mail"\n                               [(ngModel)]="user.email"\n                               pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"\n                               required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.email">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                    <div class="form-group">\n                        <label for="phone">Phone</label>\n                        <input class="form-control"\n                               type="text"\n                               id="phone"\n                               name="phone"\n                               placeholder="Phone"\n                               [(ngModel)]="user.phone">\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.phone">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-lg-6 col-xs-12">\n                    <!--<div class="form-group">-->\n                    <!--<input class="form-control" type="password" name="confirmPassword"-->\n                    <!--placeholder="Confirm Password" [(ngModel)]="user.confirmPassword"-->\n                    <!--tfcDirValidateEqual="password">-->\n                    <!--<ul class="validation-errors-list filled"-->\n                    <!--*ngFor="let err of formErrors.confirmPassword">-->\n                    <!--<li class="validation-type">{{ err }}</li>-->\n                    <!--</ul>-->\n                    <!--</div>-->\n                </div>\n            </div>\n            <div class="clearfix">\n                <div class="btn-toolbar pull-xs-right m-t-1">\n                    <button class="btn btn-secondary btn-sm" (click)="cancel($event)">Cancel\n                    </button>\n                    <button type="submit" class="btn btn-inverse btn-sm"\n                            (click)="updateUser(userForm.valid, userForm.value)"\n                            [disabled]="!userForm.valid">Save\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</section>';
}});