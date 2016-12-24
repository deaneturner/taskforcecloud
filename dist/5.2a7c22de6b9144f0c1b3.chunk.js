webpackJsonp([5],{1001:function(e,n,t){"use strict";var s=t(1),a=t(184),o=t(87),i=t(274),r=function(){function UserEditComponent(e,n,t){this.router=e,this.activatedRoute=n,this.userService=t,this.user={},this.formErrors={username:[],password:[],confirmPassword:[]},this.validationMessages={username:{required:"User name is required.",pattern:"User name must be formatted as as an email address.",exists:"A user with this user name currently exists."},password:{required:"Password is required.",validateEqual:"Password and Confirm Password must match.",pattern:"Length must be between 8 and 32 characters and contain [one or more uppercase letters], [one or more lowercase letters], and [one or more numbers]."},confirmPassword:{required:"Confirmation of password is required.",validateEqual:"Password and Confirm Password must match."}}}return UserEditComponent.prototype.ngOnInit=function(){var e=this;this.activatedRoute.params.subscribe(function(n){var t=e.userService.cacheManager.getCache("cachedUserObservable")||{};n.id!==t._id?e.userService.getUser(n.id).subscribe(function(n){e.user=n,e.userService.cacheManager.setCache("cachedUserObservable",n)},function(e){}):t&&(e.user=t)})},UserEditComponent.prototype.updateUser=function(e,n){var t=this;e&&(delete n.password,this.userService.updateUser(this.user._id,n).subscribe(function(e){if(e.success)t.router.navigate(["/app/users/detail",t.user._id]);else if(e.success===!1){var n=e.field;t.formErrors[n]=[],t.formErrors[n].push(t.validationMessages[n][e.msgKey])}},function(e){}))},UserEditComponent.prototype.goToDetail=function(e){e.preventDefault(),e.stopPropagation(),this.userService.cacheManager.selectUser(["/app/users/detail/",this.user._id])},UserEditComponent.prototype.ngAfterViewChecked=function(){this.formChanged()},UserEditComponent.prototype.formChanged=function(){var e=this;this.currentForm!==this.userForm&&(this.userForm=this.currentForm,this.userForm&&this.userForm.valueChanges.subscribe(function(n){return e.onValueChanged(n)}))},UserEditComponent.prototype.onValueChanged=function(e){if(this.userForm){var n=this.userForm.form;for(var t in this.formErrors)if(t){this.formErrors[t]=[];var s=n.get(t);if(s&&s.dirty&&!s.valid){var a=this.validationMessages[t];for(var o in s.errors)o&&this.formErrors[t].push(a[o])}}}},__decorate([s.ViewChild("userForm"),__metadata("design:type","function"==typeof(e="undefined"!=typeof a.NgForm&&a.NgForm)&&e||Object)],UserEditComponent.prototype,"currentForm",void 0),UserEditComponent=__decorate([s.Component({selector:"user-edit",template:t(1111),styles:[t(1094)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof o.Router&&o.Router)&&n||Object,"function"==typeof(r="undefined"!=typeof o.ActivatedRoute&&o.ActivatedRoute)&&r||Object,"function"==typeof(l="undefined"!=typeof i.UserService&&i.UserService)&&l||Object])],UserEditComponent);var e,n,r,l}();n.UserEditComponent=r},1002:function(e,n,t){"use strict";var s=t(1),a=t(87),o=t(274),i=function(){function UserListComponent(e,n){this.router=e,this.userService=n}return UserListComponent.prototype.ngOnInit=function(){this.getUsers()},UserListComponent.prototype.getUsers=function(){var e=this;this.userService.getUsers().subscribe(function(n){return e.users=n},function(e){})},UserListComponent=__decorate([s.Component({selector:"tfc-user-list",template:t(1005),styles:[t(1004)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof a.Router&&a.Router)&&e||Object,"function"==typeof(n="undefined"!=typeof o.UserService&&o.UserService)&&n||Object])],UserListComponent);var e,n}();n.UserListComponent=i},1003:function(e,n,t){"use strict";var s=t(1),a=t(85),o=t(87),i=t(1002),r=function(){function UserListModule(){}return UserListModule=__decorate([s.NgModule({imports:[a.CommonModule,o.RouterModule],declarations:[i.UserListComponent],exports:[i.UserListComponent]}),__metadata("design:paramtypes",[])],UserListModule)}();n.UserListModule=r},1004:function(e,n){e.exports=""},1005:function(e,n){e.exports='<div class="list-group list-group-lg">\n    <a *ngFor="let user of users" class="list-group-item" (click)="userService.cacheManager.selectUser([\'/app/users/detail/\', user._id])">\n        <span class="thumb-sm pull-xs-left mr">\n                    <img class="img-circle" src="{{ user.imgSrc || \'assets/img/avatar.png\' }}" alt="...">\n                </span>\n        <!--<i class="fa fa-circle pull-xs-right mt-sm" [ngClass]="user.indicatorClass"></i>-->\n        <h6 class="no-margin pull-xs-right">{{ user.role || \'\'}}</h6>\n        <h6 class="no-margin">{{ user.username || \'\'}}</h6>\n        <small class="text-muted">{{ user.firstName }} {{ user.lastName }}</small>\n    </a>\n</div>\n'},1037:function(e,n,t){"use strict";var s=t(1),a=t(87),o=t(185),i=t(276),r=t(274),l=t(1001),c=function(){function UserDetailComponent(e,n,t,s,a){this.appState=e,this.router=n,this.notificationService=t,this.userService=s,this.activatedRoute=a,this.user={}}return UserDetailComponent.prototype.ngOnInit=function(){var e=this,n=this;this.panel={title:"Profile",collapsed:!1,close:!1,fullScreen:!1,menu:[{title:"Edit",onMenuSelect:function(){return e.onMenuSelect("edit")}},{title:"Delete",onMenuSelect:function(){return e.onMenuSelect("delete")}}]},this.activatedRoute.params.subscribe(function(e){var t=n.userService.cacheManager.getCache("cachedUserObservable")||{};e.id!==t._id?(n.userService.cacheManager.clearCache("cachedUserObservable"),n.userService.getUser(e.id).subscribe(function(e){n.user=e,n.userService.cacheManager.setCache("cachedUserObservable",e)},function(e){})):t&&(n.user=t)})},UserDetailComponent.prototype.onMenuSelect=function(e){var n=this;switch(e){case"edit":this.userService.cacheManager.selectUser(["/app/users/edit/",this.user._id]);break;case"delete":this.appState.get("currentUser")._id===this.user._id?this.notificationService.showModal({title:"Cancel delete",subTitle:null,content:"Cannot delete the currently logged in user:",subContent:n.user.firstName+" "+n.user.lastName+" ("+n.user.username+")",buttons:[{title:"OK",onClick:function(e){n.notificationService.closeModal()},"class":"btn btn-success"}]}):this.notificationService.showModal({title:"Confirm Delete",subTitle:null,content:"Are you sure you want to delete user:",subContent:n.user.firstName+" "+n.user.lastName+" ("+n.user.username+")",buttons:[{title:"Cancel",onClick:function(e){n.notificationService.closeModal()},"class":"btn btn-gray"},{title:"Yes, delete",onClick:function(e){n.userService.deleteUser(n.activatedRoute.snapshot.params.id).subscribe(function(e){n.notificationService.displayMessage({message:"Deleted "+e.firstName+" "+e.lastName+" ("+e.username+")",type:"success"}),n.notificationService.closeModal(),n.router.navigate(["/app/users"])},function(e){})},"class":"btn btn-success"}]})}},__decorate([s.ViewChild(l.UserEditComponent),__metadata("design:type","function"==typeof(e="undefined"!=typeof l.UserEditComponent&&l.UserEditComponent)&&e||Object)],UserDetailComponent.prototype,"userEditComponent",void 0),UserDetailComponent=__decorate([s.Component({selector:"user-detail",template:t(1110),styles:[t(1093)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof o.AppState&&o.AppState)&&n||Object,"function"==typeof(c="undefined"!=typeof a.Router&&a.Router)&&c||Object,"function"==typeof(d="undefined"!=typeof i.NotificationService&&i.NotificationService)&&d||Object,"function"==typeof(p="undefined"!=typeof r.UserService&&r.UserService)&&p||Object,"function"==typeof(m="undefined"!=typeof a.ActivatedRoute&&a.ActivatedRoute)&&m||Object])],UserDetailComponent);var e,n,c,d,p,m}();n.UserDetailComponent=c},1038:function(e,n,t){"use strict";var s=t(1),a=function(){function UsersComponent(){this.sortOptions={connectWith:".widget-container",handle:"header, .handle",cursor:"move",iframeFix:!1,items:".widget:not(.locked)",opacity:.8,helper:"original",revert:!0,forceHelperSize:!0,placeholder:"widget widget-placeholder",forcePlaceholderSize:!0,tolerance:"pointer"}}return UsersComponent.prototype.ngOnInit=function(){this.panel={title:"Users",iconClass:["glyphicon-user"]}},UsersComponent=__decorate([s.Component({selector:"users",template:t(1112),styles:[t(1095)],encapsulation:s.ViewEncapsulation.None}),__metadata("design:paramtypes",[])],UsersComponent)}();n.UsersComponent=a},1083:function(e,n,t){"use strict";var s=t(1),a=t(85),o=t(184),i=t(1038),r=t(1037),l=t(1001),c=t(1003),d=t(992),p=t(1084),m=function(){function UserModule(){}return UserModule=__decorate([s.NgModule({imports:[a.CommonModule,c.UserListModule,d.PanelModule,o.FormsModule,p.ROUTES],declarations:[i.UsersComponent,r.UserDetailComponent,l.UserEditComponent]}),__metadata("design:paramtypes",[])],UserModule)}();Object.defineProperty(n,"__esModule",{value:!0}),n.default=m},1084:function(e,n,t){"use strict";var s=t(87),a=t(1038),o=t(1037),i=t(1001),r=t(458),l=[{path:"",component:a.UsersComponent,pathMatch:"full",canActivate:[r.AppGuard]},{path:"detail/:id",component:o.UserDetailComponent,pathMatch:"full",canActivate:[r.AppGuard]},{path:"edit/:id",component:i.UserEditComponent,pathMatch:"full",canActivate:[r.AppGuard]}];n.ROUTES=s.RouterModule.forChild(l)},1093:function(e,n){e.exports='/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: "\\25cf";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: "";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row {\n  margin-bottom: 15px; }\n\n.stat-item {\n  display: inline-block;\n  padding-right: 15px; }\n  .stat-item + .stat-item {\n    padding-left: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1); }\n  .stat-item .name {\n    margin-bottom: 2px; }\n  .stat-item .value {\n    font-weight: bold; }\n  .stat-item.stat-item-mini-chart {\n    position: relative;\n    top: -12px;\n    padding-left: 0;\n    border-left: none; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: "";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n'},1094:function(e,n){e.exports=".user-form .form-control {\n  font-size: 13px;\n  background-color: #eeeeee; }\n  .user-form .form-control:focus {\n    background-color: #ddd; }\n"},1095:function(e,n){e.exports=""},1110:function(e,n){e.exports='<ol class="breadcrumb">\n    <li class="breadcrumb-item">YOU ARE HERE</li>\n    <li class="active breadcrumb-item">User Detail</li>\n</ol>\n<h1 class="page-title">User - <span class="fw-semi-bold">Profile</span></h1>\n<div class="row user-detail">\n    <div class="col-lg-6 col-xs-12">\n        <tfc-panel [title]="panel.title" [collapsed]="panel.collapsed" [showFullscreen]="panel.fullScreen"\n                   [menu]="panel.menu">\n            <section class="widget">\n                <div class="widget-body">\n                    <div class="widget-top-overflow text-white">\n                        <div class="height-100 overflow-hidden">\n                            <!--<img class="img-fluid" src="assets/img/pictures/19.jpg">-->\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="col-md-5 col-xs-12 text-xs-center">\n                            <div class="post-user post-user-profile">\n              <span class="thumb-xlg">\n                <img class="img-circle" src="assets/img/avatar.png" alt="...">\n              </span>\n                                <h5 class="fw-normal">Adam <span class="fw-semi-bold">Johns</span></h5>\n                                <div>{{user.username}}</div>\n                                <p>{{user.firstName}} {{user.lastName}}</p>\n                                <p>{{user.role}}</p>\n                                <a href="#" class="btn btn-danger btn-sm mt">\n                                    &nbsp;Send\n                                    <i class="fa fa-envelope ml-xs"></i>&nbsp;\n                                </a>\n                                <ul class="contacts">\n                                    <li><i class="fa fa-phone fa-fw mr-xs"></i><a href="#"> +375 29 555-55-55</a></li>\n                                    <li><i class="fa fa-envelope fa-fw mr-xs"></i><a href="#"> psmith@example.com</a>\n                                    </li>\n                                    <li><i class="fa fa-map-marker fa-fw mr-xs"></i><a href="#"> Minsk, Belarus</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class="col-md-7 col-xs-12">\n                            <div class="stats-row stats-row-profile mt text-xs-right">\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">251</p>\n                                    <h6 class="name">Posts</h6>\n                                </div>\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">9.38%</p>\n                                    <h6 class="name">Conversion</h6>\n                                </div>\n                                <div class="stat-item">\n                                    <p class="value text-xs-right">842</p>\n                                    <h6 class="name">Followers</h6>\n                                </div>\n                            </div>\n                            <p class="text-xs-right mt-lg">\n                                <a href="#" class="tag tag-warning"> UI/UX </a>\n                                <a href="#" class="tag tag-danger ml-xs"> Web Design </a>\n                                <a href="#" class="tag tag-default ml-xs"> Mobile Apps </a>\n                            </p>\n                            <p class="lead mt-lg">\n                                My name is Adam Johns and here is my new Sing user profile page.\n                            </p>\n                            <p>\n                                I love reading people\'s summaries page especially those who are in the same industry as\n                                me.\n                                Sometimes it\'s much easier to find your concentration during the night.\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </tfc-panel>\n    </div>\n    <div class="col-lg-6 col-xs-12">\n        <section class="activities">\n            <h2 class="m-l-1">Activities</h2>\n            <section class="event">\n        <span class="thumb-sm avatar pull-left mr-sm">\n          <img class="img-circle" src="assets/img/people/a5.jpg" alt="...">\n        </span>\n                <h5 class="event-heading"><a href="#">Bob Nilson</a>\n                    <small><a href="#">@nils</a></small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    There is no such thing as maturity. There is instead an ever-evolving process of maturing.\n                    Because when there is a maturity, there is ...\n                </p>\n                <footer>\n                    <ul class="post-links">\n                        <li><a href="#">1 hour</a></li>\n                        <li><a href="#"><span class="text-danger"><i class="fa fa-heart"></i> Like</span></a></li>\n                        <li><a href="#">Comment</a></li>\n                    </ul>\n                </footer>\n            </section>\n            <section class="event">\n                <h5 class="event-heading"><a href="#">Jessica Smith</a>\n                    <small>@jess</small>\n                </h5>\n                <p class="text-muted">February 22, 2014 at 01:59 PM</p>\n                <p class="fs-mini">\n                    Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\n                    my brand new HDD 40TB. Thanks god I found it!\n                </p>\n                <footer>\n                    <div class="clearfix">\n                        <ul class="post-links mt-sm pull-left">\n                            <li><a href="#">1 hour</a></li>\n                            <li><a href="#"><span class="text-danger"><i class="fa fa-heart-o"></i> Like</span></a></li>\n                            <li><a href="#">Comment</a></li>\n                        </ul>\n\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#">\n                <img class="img-circle" src="assets/img/people/a1.jpg">\n              </a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a5.jpg"></a>\n            </span>\n                        <span class="thumb thumb-sm pull-right">\n              <a href="#"><img class="img-circle" src="assets/img/people/a3.jpg"></a>\n            </span>\n                    </div>\n                    <ul class="post-comments mt-sm">\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/people/a1.jpg" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <h6 class="author fs-sm fw-semi-bold">Ignacio Abad\n                                    <small>6 mins ago</small>\n                                </h6>\n                                <p>Hey, have you heard anything about that?</p>\n                            </div>\n                        </li>\n                        <li>\n              <span class="thumb-xs avatar pull-left mr-sm">\n                <img class="img-circle" src="assets/img/avatar.png" alt="...">\n              </span>\n                            <div class="comment-body">\n                                <input class="form-control form-control-sm" type="text"\n                                       placeholder="Write your comment...">\n                            </div>\n                        </li>\n                    </ul>\n                </footer>\n            </section>\n            <form class="mt" action="#">\n                <div class="form-group mb-0">\n                    <label class="sr-only" for="new-event">New event</label>\n                    <textarea class="form-control" id="new-event" placeholder="Post something..." rows="3"></textarea>\n                </div>\n                <div class="btn-toolbar">\n                    <div class="btn-group">\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-camera fa-lg"></i>\n                        </a>\n                        <a href="#" class="btn btn-sm btn-gray">\n                            <i class="fa fa-map-marker fa-lg"></i>\n                        </a>\n                    </div>\n                    <button type="submit" class="btn btn-danger btn-sm pull-right">Post</button>\n                </div>\n            </form>\n        </section>\n    </div>\n</div>\n'},1111:function(e,n){e.exports='<ol class="breadcrumb">\n    <li class="breadcrumb-item">YOU ARE HERE</li>\n    <li class="active breadcrumb-item">User Detail</li>\n</ol>\n<h1 class="page-title">Edit User <span class="fw-semi-bold">Profile</span></h1>\n<section class="widget" widget id="autoload-widget"\n         data-widgster-load="assets/demo/grid/autoload.php"\n         data-post-processing="true"\n         data-widgster-autoload="false"\n         data-widgster-show-loader="false">\n    <header></header>\n    <div class="widget-body">\n        <form class="user-form mt-lg" role="form" #userForm="ngForm" novalidate>\n            <div class="row">\n                <div class="col-lg-6 col-xs-12">\n                    <div class="form-group">\n                        <input type="email" class="form-control" name="username"\n                               placeholder="Username (E-mail Address)"\n                               [(ngModel)]="user.username" required\n                               pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.username">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                    <div class="form-group">\n                        <select class="form-control selectpicker"\n                                data-style="btn-danger btn-sm"\n                                data-width="auto"\n                                tabindex="-1" id="simple-red-select"\n                                name="role"\n                                [(ngModel)]="user.role"\n                                required>\n                            <option value=""></option>\n                            <option value="Administrator">Administrator</option>\n                            <option value="Supervisor">Supervisor</option>\n                            <option value="Contributor">Contributor</option>\n                            <option value="Inactive">Inactive</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="col-lg-6 col-xs-12">\n                    <div class="form-group">\n                        <input class="form-control" type="text" name="firstName"\n                               placeholder="First Name"\n                               [(ngModel)]="user.firstName" required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.firstName">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                    <div class="form-group">\n                        <input class="form-control" type="text" name="lastName" placeholder="Last Name"\n                               [(ngModel)]="user.lastName" required>\n                        <ul class="validation-errors-list filled"\n                            *ngFor="let err of formErrors.lastName">\n                            <li class="validation-type">{{ err }}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-lg-6 col-xs-12">\n                    <!--<div class="form-group">-->\n                    <!--<input class="form-control" type="password" name="confirmPassword"-->\n                    <!--placeholder="Confirm Password" [(ngModel)]="user.confirmPassword"-->\n                    <!--validateEqual="password">-->\n                    <!--<ul class="validation-errors-list filled"-->\n                    <!--*ngFor="let err of formErrors.confirmPassword">-->\n                    <!--<li class="validation-type">{{ err }}</li>-->\n                    <!--</ul>-->\n                    <!--</div>-->\n                </div>\n            </div>\n            <div class="clearfix">\n                <div class="btn-toolbar pull-xs-right m-t-1">\n                    <button class="btn btn-secondary btn-sm" (click)="goToDetail($event)">Cancel\n                    </button>\n                    <button type="submit" class="btn btn-inverse btn-sm"\n                            (click)="updateUser(userForm.valid, userForm.value)"\n                            [disabled]="!userForm.valid">Save\n                    </button>\n                </div>\n            </div>\n        </form>\n    </div>\n</section>'},1112:function(e,n){e.exports='<style>\n    body {\n        overflow-x: visible;\n    }\n</style>\n<ol class="breadcrumb">\n    <li class="breadcrumb-item">YOU ARE HERE</li>\n    <li class="breadcrumb-item active">Users</li>\n</ol>\n<div class="row">\n    <div class="col-lg-6">\n        <tfc-panel [title]="panel.title"\n                   [iconClass]="panel.iconClass">\n            <tfc-user-list></tfc-user-list>\n        </tfc-panel>\n    </div>\n</div>'},990:function(e,n,t){"use strict";var s=t(1),a=function(){function PanelComponent(){this.collapsed=!1,this.showReload=!1,this.showClose=!1,this.showFullscreen=!1,this.menu=[],this.showDropdown=!1}return PanelComponent.prototype.ngOnInit=function(){this.showDropdown=this.menu.length>0},__decorate([s.Input(),__metadata("design:type",String)],PanelComponent.prototype,"title",void 0),__decorate([s.Input(),__metadata("design:type",Array)],PanelComponent.prototype,"iconClass",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"collapsed",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showReload",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showClose",void 0),__decorate([s.Input(),__metadata("design:type",Boolean)],PanelComponent.prototype,"showFullscreen",void 0),__decorate([s.Input(),__metadata("design:type",Object)],PanelComponent.prototype,"menu",void 0),PanelComponent=__decorate([s.Component({selector:"tfc-panel",template:t(994),encapsulation:s.ViewEncapsulation.None,styles:[t(993)]}),__metadata("design:paramtypes",[])],PanelComponent)}();n.PanelComponent=a},991:function(e,n,t){"use strict";(function(e){var s=t(1),a=function(){function PanelDirective(){}return PanelDirective.prototype.render=function(){e.fn.widgster.Constructor.DEFAULTS.bodySelector=".widget-body";var n=e(".widget"),t=e("#panel-widget");n.on("fullscreen.widgster",function(){e(".content-wrap").css({"-webkit-transform":"none","-ms-transform":"none",transform:"none",margin:0,"z-index":2}),e(".widget-container").sortable("option","disabled",!0)}).on("restore.widgster closed.widgster",function(){e(".content-wrap").css({"-webkit-transform":"","-ms-transform":"",transform:"",margin:"","z-index":""}),e("body").css({"overflow-y":"scroll"}),e(".widget-container").sortable("option","disabled",!1)}),t.widgster({loaderTemplate:'<div class="loader animated fadeIn">   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span></div>',collapsed:this.collapsed}),n.widgster()},PanelDirective.prototype.ngOnInit=function(){this.render()},__decorate([s.Input(),__metadata("design:type",Boolean)],PanelDirective.prototype,"collapsed",void 0),PanelDirective=__decorate([s.Directive({selector:"[panel-widget]"}),__metadata("design:paramtypes",[])],PanelDirective)}();n.PanelDirective=a}).call(n,t(86))},992:function(e,n,t){"use strict";var s=t(1),a=t(85),o=t(990),i=t(991),r=function(){function PanelModule(){}return PanelModule=__decorate([s.NgModule({imports:[a.CommonModule],declarations:[o.PanelComponent,i.PanelDirective],exports:[o.PanelComponent,i.PanelDirective]}),__metadata("design:paramtypes",[])],PanelModule)}();n.PanelModule=r},993:function(e,n){e.exports=""},994:function(e,n){e.exports='<div panel-widget [collapsed]="collapsed">\n    <div class="widget-container">\n        <section class="widget" widget id="panel-widget"\n                 data-widgster-load="assets/demo/grid/shares.php"\n                 data-post-processing="true">\n            <header>\n                <h6>\n                    <span *ngIf="iconClass && iconClass.length" class="tag tag-primary"><i class="glyphicon"\n                                                                                           [ngClass]="iconClass"></i></span>\n                    <span class="fw-semi-bold">{{title}}</span>\n                </h6>\n                <div>\n                    <div [style.visibility]="showDropdown ? \'hidden\' : \'visible\'" class="widget-controls">\n                        <a *ngIf="showReload" data-gster="load" title="Reload" href="#"><i\n                                class="fa fa-refresh"></i></a>\n                        <a data-widgster="expand" title="Expand" href="#"><i class="glyphicon glyphicon-chevron-up"></i></a>\n                        <a data-widgster="collapse" title="Collapse" href="#"><i\n                                class="glyphicon glyphicon-chevron-down"></i></a>\n                        <a *ngIf="showFullscreen" data-widgster="fullscreen" title="Full Screen" href="#"><i\n                                class="glyphicon glyphicon-fullscreen"></i></a>\n                        <a data-widgster="restore" title="Restore" href="#"><i\n                                class="glyphicon glyphicon-resize-small"></i></a>\n                        <a *ngIf="showClose" data-widgster="close" title="Close" href="#"><i\n                                class="glyphicon glyphicon-remove"></i></a>\n                    </div>\n                    <div *ngIf="showDropdown" class="widget-controls dropdown" data-dropdown\n                         data-ng-init="isOpen = false"\n                         data-is-open="isOpen">\n                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n                            <i class="fa fa-bars"></i>\n                        </a>\n                        <ul class="dropdown-menu dropdown-menu-right">\n                            <li *ngFor="let menuItem of menu; let last = last">\n                                <a class="dropdown-item" (click)="menuItem.onMenuSelect()">{{menuItem.title}}</a>\n                                <div *ngIf="!last"class="dropdown-divider"></div>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </header>\n            <div class="widget-body no-padding">\n                <ng-content></ng-content>\n            </div>\n        </section>\n    </div>\n</div>\n';
}});