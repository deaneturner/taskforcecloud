webpackJsonp([1],{689:function(e,r,t){"use strict";var n=t(73),i=t(157),o=t(0),s=t(86),a=t(749),d=t(761);r.routes=[{path:"",component:d.Register,pathMatch:"full"}];var l=function(){function RegisterModule(){}return RegisterModule.routes=r.routes,RegisterModule=__decorate([o.NgModule({declarations:[d.Register,a.EqualValidator],imports:[n.CommonModule,i.FormsModule,s.RouterModule.forChild(r.routes)]}),__metadata("design:paramtypes",[])],RegisterModule)}();Object.defineProperty(r,"__esModule",{value:!0}),r.default=l},692:function(e,r,t){"use strict";var n=t(0),i=t(108),o=function(){function AuthService(e){this.http=e}return AuthService.prototype.setIsLoggedIn=function(e,r){e?window.localStorage.setItem("id_token",r):window.localStorage.removeItem("id_token"),this.isLoggedin=e},AuthService.prototype.returnLoginResult=function(e,r){var t=e.json();if(t.success){var n=t.id_token;n&&this.setIsLoggedIn(!0,n)}r(t)},AuthService.prototype.loginfn=function(e){var r=this;this.isLoggedin=!1;var t=new i.Headers,n="username="+e.username+"&password="+e.password+"&isKeepLoggedIn="+e.isKeepLoggedIn;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){r.http.post("/login",n,{headers:t}).subscribe(function(t){r.returnLoginResult(t,e)})})},AuthService.prototype.logoutfn=function(){var e=this;return new Promise(function(r){e.setIsLoggedIn(!1),r(e.isLoggedin)})},AuthService.prototype.registerfn=function(e){var r=this;this.isLoggedin=!1;var t=new i.Headers,n="username="+e.username+"&password="+e.password+"&confirmPassword="+e.confirmPassword+"&isKeepLoggedIn="+e.isKeepLoggedIn;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){r.http.post("/register",n,{headers:t}).subscribe(function(t){r.returnLoginResult(t,e)})})},AuthService=__decorate([n.Injectable(),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof i.Http&&i.Http)&&e||Object])],AuthService);var e}();r.AuthService=o},749:function(e,r,t){"use strict";var n=t(0),i=t(157),o=function(){function EqualValidator(e,r){this.validateEqual=e,this.reverse=r}return Object.defineProperty(EqualValidator.prototype,"isReverse",{get:function(){return!!this.reverse&&"true"===this.reverse},enumerable:!0,configurable:!0}),EqualValidator.prototype.validate=function(e){var r=e.value,t=e.root.get(this.validateEqual);return t&&r!==t.value&&!this.isReverse?{validateEqual:!1}:(t&&r===t.value&&this.isReverse&&(delete t.errors.validateEqual,Object.keys(t.errors).length||t.setErrors(null)),t&&r!==t.value&&this.isReverse&&t.setErrors({validateEqual:!1}),null)},EqualValidator=__decorate([n.Directive({selector:"[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]",providers:[{provide:i.NG_VALIDATORS,useExisting:n.forwardRef(function(){return EqualValidator}),multi:!0}]}),__param(0,n.Attribute("validateEqual")),__param(1,n.Attribute("reverse")),__metadata("design:paramtypes",[String,String])],EqualValidator)}();r.EqualValidator=o},761:function(e,r,t){"use strict";var n=t(0),i=t(86),o=t(157),s=t(692),a=function(){function Register(e,r){this.service=e,this.router=r,this.formErrors={username:[],password:[],confirmPassword:[]},this.validationMessages={username:{required:"User name is required.",pattern:"User name must be formatted as as an email address.",exists:"A user with this user name currently exists."},password:{required:"Password is required.",validateEqual:"Password and Confirm Password must match.",pattern:"Length must be between 8 and 32 characters and contain [one or more uppercase letters], [one or more lowercase letters], and [one or more numbers]."},confirmPassword:{required:"Confirmation of password is required.",validateEqual:"Password and Confirm Password must match."}}}return Register.prototype.ngOnInit=function(){this.user={username:"",password:"",confirmPassword:"",isKeepLoggedIn:!1}},Register.prototype.register=function(e,r){var t=this;e&&this.service.registerfn(r).then(function(e){if(e.success)t.router.navigate(["/app/dashboard"]);else if(e.success===!1){var r=e.field;t.formErrors[r].push(t.validationMessages[r][e.msgKey])}})},Register.prototype.ngAfterViewChecked=function(){this.formChanged()},Register.prototype.formChanged=function(){var e=this;this.currentForm!==this.registrationForm&&(this.registrationForm=this.currentForm,this.registrationForm&&this.registrationForm.valueChanges.subscribe(function(r){return e.onValueChanged(r)}))},Register.prototype.onValueChanged=function(e){if(this.registrationForm){var r=this.registrationForm.form;for(var t in this.formErrors){this.formErrors[t]=[];var n=r.get(t);if(n&&n.dirty&&!n.valid){var i=this.validationMessages[t];for(var o in n.errors)this.formErrors[t].push(i[o])}}}},__decorate([n.ViewChild("registrationForm"),__metadata("design:type","function"==typeof(e="undefined"!=typeof o.NgForm&&o.NgForm)&&e||Object)],Register.prototype,"currentForm",void 0),Register=__decorate([n.Component({selector:"register",styles:[t(763)],template:t(773),encapsulation:n.ViewEncapsulation.None,host:{"class":"register-page app"},providers:[s.AuthService]}),__metadata("design:paramtypes",["function"==typeof(r="undefined"!=typeof s.AuthService&&s.AuthService)&&r||Object,"function"==typeof(a="undefined"!=typeof i.Router&&i.Router)&&a||Object])],Register);var e,r,a}();r.Register=a},763:function(e,r){e.exports="/***********************************/\n/**          REGISTER             **/\n/***********************************/\n.register-page {\n  background-color: #ddd; }\n\n.register-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .register-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-register-container {\n  padding-top: 10%; }\n\n.widget-register-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-register-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-register {\n  padding: 30px; }\n  .widget-register > header h1, .widget-register > header h2, .widget-register > header h3, .widget-register > header h4, .widget-register > header h5, .widget-register > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-register-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-register-info.abc-checkbox {\n    margin-left: -25px; }\n\n.register-form .form-control {\n  font-size: 13px;\n  background-color: #eceeef; }\n  .register-form .form-control:focus {\n    background-color: #ddd; }\n"},773:function(e,r){e.exports='<div class="container">\n    <main id="content" class="widget-register-container" role="main">\n        <div class="row">\n            <div class="col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1">\n                <h5 class="widget-register-logo animated fadeInUp">\n                    <i class="fa fa-circle text-gray"></i>\n                    Task Force Cloud\n                    <i class="fa fa-circle text-warning"></i>\n                </h5>\n                <section class="widget widget-register animated fadeInUp">\n                    <header>\n                        <h3>Register with Task Force Cloud</h3>\n                    </header>\n                    <div class="widget-body">\n                        <!--<p class="widget-register-info">-->\n                            <!--Use Facebook, Twitter or your email to sign in.-->\n                        <!--</p>-->\n                        <p class="widget-register-info">\n                            Have an account? <a [routerLink]="[\'/login\']">Log in now!</a>\n                        </p>\n                        <form class="register-form mt-lg" role="form" #registrationForm="ngForm" novalidate>\n                            <div class="form-group">\n                                <input type="email" class="form-control" name="username" placeholder="Username (E-mail Address)"\n                                       [(ngModel)]="user.username" required\n                                       pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" required>\n                                <ul class="validation-errors-list filled" *ngFor="let err of formErrors.username">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="password" name="password" placeholder="Password"\n                                       [(ngModel)]="user.password" validateEqual="confirmPassword" reverse="true"\n                                       pattern="^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*" required>\n                                <ul class="validation-errors-list filled" *ngFor="let err of formErrors.password">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="password" name="confirmPassword"\n                                       placeholder="Confirm Password" [(ngModel)]="user.confirmPassword"\n                                       validateEqual="password" required>\n                                <ul class="validation-errors-list filled"\n                                    *ngFor="let err of formErrors.confirmPassword">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="clearfix">\n                                <div class="btn-toolbar pull-xs-right m-t-1">\n                                    <button class="btn btn-secondary btn-sm" [routerLink]="[\'/login\']">Back to Login\n                                    </button>\n                                    <button type="submit" class="btn btn-inverse btn-sm"\n                                            (click)="register(registrationForm.valid, registrationForm.value)"\n                                            [disabled]="!registrationForm.valid">Create\n                                        Account\n                                    </button>\n                                </div>\n                            </div>\n                            <div class="row m-t-1">\n                                <div class="col-md-6 push-md-6">\n                                    <div class="clearfix">\n                                        <div class="abc-checkbox widget-register-info pull-xs-right">\n                                            <input type="checkbox" id="isKeepLoggedIn" name="isKeepLoggedIn"\n                                                   [(ngModel)]="user.isKeepLoggedIn">\n                                            <label for="isKeepLoggedIn">Keep me signed in </label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="col-md-6 pull-md-6">\n                                    <a class="mr-n-lg" href="#">Trouble with account?</a>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </section>\n            </div>\n        </div>\n    </main>\n    <footer class="page-footer">\n        2016 &copy; Task Force Cloud\n    </footer>\n</div>\n'}});