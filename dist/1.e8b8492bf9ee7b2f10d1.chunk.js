webpackJsonp([1],{662:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(58),i=t(96),o=t(8),s=t(52),a=t(931),d=t(943);r.routes=[{path:"",component:d.RegistrationComponent,pathMatch:"full"}];var l=function(){function RegisterModule(){}return RegisterModule}();l.routes=r.routes,l=__decorate([o.NgModule({declarations:[d.RegistrationComponent,a.EqualValidatorDirective],imports:[n.CommonModule,i.FormsModule,s.RouterModule.forChild(r.routes)]})],l),r.default=l},680:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(8),i=t(54),o=function(){function AuthService(e){this.http=e}return AuthService.prototype.setIsLoggedIn=function(e,r){e?window.localStorage.setItem("id_token",r):window.localStorage.removeItem("id_token"),this.isLoggedin=e},AuthService.prototype.returnLoginResult=function(e,r){var t=e.json();if(t.success){var n=t.id_token;n&&this.setIsLoggedIn(!0,n)}r(t)},AuthService.prototype.loginfn=function(e){var r=this;this.isLoggedin=!1;var t=new i.Headers,n="username="+e.username+"&password="+e.password+"&isKeepLoggedIn="+e.isKeepLoggedIn;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){r.http.post("/login",n,{headers:t}).subscribe(function(t){r.returnLoginResult(t,e)})})},AuthService.prototype.logoutfn=function(){var e=this;return new Promise(function(r){e.setIsLoggedIn(!1),r(e.isLoggedin)})},AuthService.prototype.registerfn=function(e){var r=this;this.isLoggedin=!1;var t=new i.Headers,n="username="+e.username+"&password="+e.password+"&confirmPassword="+e.confirmPassword+"&isKeepLoggedIn="+e.isKeepLoggedIn+"&firstName="+e.firstName+"&lastName="+e.lastName;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){r.http.post("/register",n,{headers:t}).subscribe(function(t){r.returnLoginResult(t,e)})})},AuthService}();o=__decorate([n.Injectable(),__metadata("design:paramtypes",[i.Http])],o),r.AuthService=o},931:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(8),i=t(96),o=s=function(){function EqualValidatorDirective(){}return Object.defineProperty(EqualValidatorDirective.prototype,"isReverse",{get:function(){return!!this.reverse&&"true"===this.reverse},enumerable:!0,configurable:!0}),EqualValidatorDirective.prototype.validate=function(e){var r=e.value,t=e.root.get(this.tfcDirValidateEqual);return t&&r!==t.value&&!this.isReverse?{tfcDirValidateEqual:!1}:(t&&r===t.value&&this.isReverse&&(delete t.errors.tfcDirValidateEqual,Object.keys(t.errors).length||t.setErrors(null)),t&&r!==t.value&&this.isReverse&&t.setErrors({tfcDirValidateEqual:!1}),null)},EqualValidatorDirective}();__decorate([n.Input(),__metadata("design:type",String)],o.prototype,"tfcDirValidateEqual",void 0),__decorate([n.Input(),__metadata("design:type",String)],o.prototype,"reverse",void 0),o=s=__decorate([n.Directive({selector:"[tfcDirValidateEqual]\n    [formControlName],[tfcDirValidateEqual][formControl],[tfcDirValidateEqual][ngModel]",providers:[{provide:i.NG_VALIDATORS,useExisting:n.forwardRef(function(){return s}),multi:!0}]}),__metadata("design:paramtypes",[])],o),r.EqualValidatorDirective=o;var s},943:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(8),i=t(52),o=t(96),s=t(680),a=function(){function RegistrationComponent(e,r){this.authService=e,this.router=r,this.isRegisterPageClassActive=!0,this.isAppClassActive=!0,this.formErrors={username:[],password:[],confirmPassword:[]},this.validationMessages={username:{required:"User name is required.",pattern:"User name must be formatted as as an email address.",exists:"A user with this user name currently exists."},password:{required:"Password is required.",tfcDirValidateEqual:"Password and Confirm Password must match.",pattern:"Length must be between 8 and 32 characters and contain [one or more uppercase letters], [one or more lowercase letters], and [one or more numbers]."},confirmPassword:{required:"Confirmation of password is required.",tfcDirValidateEqual:"Password and Confirm Password must match."}}}return RegistrationComponent.prototype.ngOnInit=function(){this.user={username:"",firstName:"",lastName:"",password:"",confirmPassword:"",role:"",email:"",phone:"",isKeepLoggedIn:!0}},RegistrationComponent.prototype.register=function(e,r){var t=this;e&&this.authService.registerfn(r).then(function(e){if(e.success)t.router.navigate(["/app/dashboard"]);else if(e.success===!1){var r=e.field;t.formErrors[r]=[],t.formErrors[r].push(t.validationMessages[r][e.msgKey])}})},RegistrationComponent.prototype.ngAfterViewChecked=function(){this.formChanged()},RegistrationComponent.prototype.formChanged=function(){var e=this;this.currentForm!==this.registrationForm&&(this.registrationForm=this.currentForm,this.registrationForm&&this.registrationForm.valueChanges.subscribe(function(r){return e.onValueChanged(r)}))},RegistrationComponent.prototype.onValueChanged=function(e){if(this.registrationForm){var r=this.registrationForm.form;for(var t in this.formErrors)if(t){this.formErrors[t]=[];var n=r.get(t);if(n&&n.dirty&&!n.valid){var i=this.validationMessages[t];for(var o in n.errors)o&&this.formErrors[t].push(i[o])}}}},RegistrationComponent}();__decorate([n.HostBinding("class.register-page"),__metadata("design:type",Boolean)],a.prototype,"isRegisterPageClassActive",void 0),__decorate([n.HostBinding("class.app"),__metadata("design:type",Boolean)],a.prototype,"isAppClassActive",void 0),__decorate([n.ViewChild("registrationForm"),__metadata("design:type",o.NgForm)],a.prototype,"currentForm",void 0),a=__decorate([n.Component({styles:[t(965)],template:t(993),encapsulation:n.ViewEncapsulation.None,providers:[s.AuthService]}),__metadata("design:paramtypes",[s.AuthService,i.Router])],a),r.RegistrationComponent=a},965:function(e,r){e.exports="/***********************************/\n/**          REGISTER             **/\n/***********************************/\n.register-page {\n  background-color: #ddd; }\n\n.register-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .register-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-register-container {\n  padding-top: 10%; }\n\n.widget-register-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-register-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-register {\n  padding: 30px; }\n  .widget-register > header h1, .widget-register > header h2, .widget-register > header h3, .widget-register > header h4, .widget-register > header h5, .widget-register > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-register-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-register-info.abc-checkbox {\n    margin-left: -25px; }\n\n.register-form .form-control {\n  font-size: 13px;\n  background-color: #eceeef; }\n  .register-form .form-control:focus {\n    background-color: #ddd; }\n"},993:function(e,r){e.exports='<div class="container">\n    <main id="content" class="widget-register-container" role="main">\n        <div class="row">\n            <div class="col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1">\n                <h5 class="widget-register-logo animated fadeInUp">\n                    <i class="fa fa-circle text-gray"></i>\n                    TF&nbsp;<i class="fa fa-cloud"></i>\n                    <i class="fa fa-circle text-warning"></i>\n                </h5>\n                <section class="widget widget-register animated fadeInUp">\n                    <header>\n                        <h3>Register with Task Force Cloud</h3>\n                    </header>\n                    <div class="widget-body">\n                        <!--<p class="widget-register-info">-->\n                        <!--Use Facebook, Twitter or your email to sign in.-->\n                        <!--</p>-->\n                        <p class="widget-register-info">\n                            Have an account? <a [routerLink]="[\'/login\']" tabindex="-1">Log in now!</a>\n                        </p>\n                        <form class="register-form mt-lg" role="form" #registrationForm="ngForm" novalidate>\n                            <div class="form-group">\n                                <input type="email" class="form-control" name="username"\n                                       placeholder="Username (E-mail Address)"\n                                       [(ngModel)]="user.username" required\n                                       pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"\n                                       tabindex="1"\n                                       autofocus\n                                       required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.username">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="text" name="firstName"\n                                       placeholder="First Name"\n                                       [(ngModel)]="user.firstName"\n                                       tabindex="2"\n                                       required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.firstName">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="text" name="lastName" placeholder="Last Name"\n                                       [(ngModel)]="user.lastName"\n                                       tabindex="3"\n                                       required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.lastName">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="password" name="password"\n                                       placeholder="Password"\n                                       [(ngModel)]="user.password" tfcDirValidateEqual="confirmPassword"\n                                       reverse="true"\n                                       pattern="^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*"\n                                       tabindex="4"\n                                       required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.password">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="password" name="confirmPassword"\n                                       placeholder="Confirm Password" [(ngModel)]="user.confirmPassword"\n                                       tfcDirValidateEqual="password"\n                                       tabindex="5"\n                                       required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.confirmPassword">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="clearfix">\n                                <div class="btn-toolbar pull-xs-right m-t-1">\n                                    <button class="btn btn-secondary btn-sm"\n                                            [routerLink]="[\'/login\']"\n                                            tabindex="-1">Back to Login\n                                    </button>\n                                    <button type="submit"\n                                            class="btn btn-inverse btn-sm"\n                                            (click)="register(registrationForm.valid, registrationForm.value)"\n                                            [disabled]="!registrationForm.valid"\n                                            tabindex="6">Register\n                                    </button>\n                                </div>\n                            </div>\n                            <div class="row m-t-1">\n                                <div class="col-md-6 push-md-6">\n                                    <div class="clearfix">\n                                        <div class="abc-checkbox widget-register-info pull-xs-right">\n                                            <input type="checkbox"\n                                                   id="isKeepLoggedIn"\n                                                   name="isKeepLoggedIn"\n                                                   [(ngModel)]="user.isKeepLoggedIn">\n                                            <label for="isKeepLoggedIn">Keep me signed in </label>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="col-md-6 pull-md-6">\n                                    <a class="mr-n-lg" href="#" tabindex="-1">Trouble with account?</a>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </section>\n            </div>\n        </div>\n    </main>\n    <footer class="page-footer">\n        2016 &copy; Task Force Cloud\n    </footer>\n</div>\n'}});