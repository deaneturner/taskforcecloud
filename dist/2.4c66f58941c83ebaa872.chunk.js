webpackJsonp([2],{1079:function(e,n,o){"use strict";var i=o(1),t=o(100),r=o(184),s=o(987),a=o(458),d=function(){function Login(e,n,o){this.service=e,this.appContextService=n,this.router=o,this.formErrors={username:[],password:[]},this.validationMessages={username:{required:"User name is required.",pattern:"User name must be formatted as as an email address.",exists:"Authentication failed, user not found."},password:{required:"Password is required.",match:"Authentication failed, wrong password."}}}return Login.prototype.ngOnInit=function(){this.user={username:"",firstName:"",lastName:"",password:"",isKeepLoggedIn:!1}},Login.prototype.login=function(e,n){var o=this,i=n;e&&this.service.loginfn(n).then(function(e){if(e.success)o.router.navigate(["/app/dashboard"]),o.appContextService.publishCurrentUser(i);else if(e.success===!1){var n=e.field;o.formErrors[n].push(o.validationMessages[n][e.msgKey])}})},Login.prototype.ngAfterViewChecked=function(){this.formChanged()},Login.prototype.formChanged=function(){var e=this;this.currentForm!==this.loginForm&&(this.loginForm=this.currentForm,this.loginForm&&this.loginForm.valueChanges.subscribe(function(n){return e.onValueChanged(n)}))},Login.prototype.onValueChanged=function(e){if(this.loginForm){var n=this.loginForm.form;for(var o in this.formErrors){this.formErrors[o]=[];var i=n.get(o);if(i&&i.dirty&&!i.valid){var t=this.validationMessages[o];for(var r in i.errors)this.formErrors[o].push(t[r])}}}},__decorate([i.ViewChild("loginForm"),__metadata("design:type","function"==typeof(e="undefined"!=typeof r.NgForm&&r.NgForm)&&e||Object)],Login.prototype,"currentForm",void 0),Login=__decorate([i.Component({selector:"login",styles:[o(1089)],template:o(1106),encapsulation:i.ViewEncapsulation.None,host:{"class":"login-page app"},providers:[s.AuthService]}),__metadata("design:paramtypes",["function"==typeof(n="undefined"!=typeof s.AuthService&&s.AuthService)&&n||Object,"function"==typeof(d="undefined"!=typeof a.AppContextService&&a.AppContextService)&&d||Object,"function"==typeof(l="undefined"!=typeof t.Router&&t.Router)&&l||Object])],Login);var e,n,d,l}();n.Login=d},1089:function(e,n){e.exports="/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #ddd; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  background-color: #eceeef; }\n  .login-form .form-control:focus {\n    background-color: #ddd; }\n"},1106:function(e,n){e.exports='<div class="container">\n    <main id="content" class="widget-login-container" role="main">\n        <div class="row">\n            <div class="col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1">\n                <h5 class="widget-login-logo animated fadeInUp">\n                    <i class="fa fa-circle text-gray"></i>\n                    TF&nbsp;<i class="fa fa-cloud"></i>\n                    <i class="fa fa-circle text-warning"></i>\n                </h5>\n                <section class="widget widget-login animated fadeInUp">\n                    <header>\n                        <h3>Login to Task Force Cloud</h3>\n                    </header>\n                    <div class="widget-body">\n                        <!--<p class="widget-login-info">-->\n                            <!--Use Facebook, Twitter or your email to sign in.-->\n                        <!--</p>-->\n                        <p class="widget-login-info">\n                            Don\'t have an account? <a [routerLink]="[\'/register\']">Sign up now!</a>\n                        </p>\n                        <form class="login-form mt-lg" role="form" #loginForm="ngForm" novalidate>\n                            <div class="form-group">\n                                <input type="email" class="form-control" name="username" placeholder="Username (E-mail Address)"\n                                       [(ngModel)]="user.username" required\n                                       pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" required>\n                                <ul class="validation-errors-list filled" *ngFor="let err of formErrors.username">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="form-group">\n                                <input class="form-control" type="password" name="password" placeholder="Password"\n                                       [(ngModel)]="user.password" required>\n                                <ul class="validation-errors-list filled" *ngFor="let err of formErrors.password">\n                                    <li class="validation-type">{{ err }}</li>\n                                </ul>\n                            </div>\n                            <div class="clearfix">\n                                <div class="btn-toolbar pull-xs-right m-t-1">\n                                    <button type="button" class="btn btn-secondary btn-sm" [routerLink]="[\'/register\']">\n                                        Sign up now!\n                                    </button>\n                                    <button type="submit" class="btn btn-inverse btn-sm"\n                                            (click)="login(loginForm.valid, loginForm.value)"\n                                            [disabled]="!loginForm.valid">Login\n                                    </button>\n                                </div>\n                            </div>\n                            <div class="row m-t-1">\n                                <div class="col-md-6 push-md-6">\n                                    <div class="clearfix">\n                                        <div class="abc-checkbox widget-login-info pull-xs-right">\n                                            <input type="checkbox" id="isKeepLoggedIn" name="isKeepLoggedIn"\n                                                   [(ngModel)]="user.isKeepLoggedIn">\n                                            <label for="isKeepLoggedIn">Keep me signed in </label>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="col-md-6 pull-md-6">\n                                    <a class="mr-n-lg" href="#">Trouble with account?</a>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </section>\n            </div>\n        </div>\n    </main>\n    <footer class="page-footer">\n        2016 &copy; Task Force Cloud\n    </footer>\n</div>\n'},983:function(e,n,o){"use strict";var i=o(85),t=o(184),r=o(1),s=o(100),a=o(458),d=o(1079);n.routes=[{path:"",component:d.Login,pathMatch:"full"}];var l=function(){function LoginModule(){}return LoginModule.routes=n.routes,LoginModule=__decorate([r.NgModule({declarations:[d.Login],imports:[i.CommonModule,t.FormsModule,s.RouterModule.forChild(n.routes)],providers:[a.AppContextService]}),__metadata("design:paramtypes",[])],LoginModule)}();Object.defineProperty(n,"__esModule",{value:!0}),n.default=l},987:function(e,n,o){"use strict";var i=o(1),t=o(101),r=function(){function AuthService(e){this.http=e}return AuthService.prototype.setIsLoggedIn=function(e,n){e?window.localStorage.setItem("id_token",n):window.localStorage.removeItem("id_token"),this.isLoggedin=e},AuthService.prototype.returnLoginResult=function(e,n){var o=e.json();if(o.success){var i=o.id_token;i&&this.setIsLoggedIn(!0,i)}n(o)},AuthService.prototype.loginfn=function(e){var n=this;this.isLoggedin=!1;var o=new t.Headers,i="username="+e.username+"&password="+e.password+"&isKeepLoggedIn="+e.isKeepLoggedIn;return o.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){n.http.post("/login",i,{headers:o}).subscribe(function(o){n.returnLoginResult(o,e)})})},AuthService.prototype.logoutfn=function(){var e=this;return new Promise(function(n){e.setIsLoggedIn(!1),n(e.isLoggedin)})},AuthService.prototype.registerfn=function(e){var n=this;this.isLoggedin=!1;var o=new t.Headers,i="username="+e.username+"&password="+e.password+"&confirmPassword="+e.confirmPassword+"&isKeepLoggedIn="+e.isKeepLoggedIn;return o.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){n.http.post("/register",i,{headers:o}).subscribe(function(o){n.returnLoginResult(o,e)})})},AuthService=__decorate([i.Injectable(),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof t.Http&&t.Http)&&e||Object])],AuthService);var e}();n.AuthService=r}});