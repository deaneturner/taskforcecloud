webpackJsonp([1],{689:function(e,n,t){"use strict";var r=t(73),o=t(157),i=t(0),s=t(86),a=t(760);n.routes=[{path:"",component:a.Register,pathMatch:"full"}];var d=function(){function RegisterModule(){}return RegisterModule.routes=n.routes,RegisterModule=__decorate([i.NgModule({declarations:[a.Register],imports:[r.CommonModule,o.FormsModule,s.RouterModule.forChild(n.routes)]}),__metadata("design:paramtypes",[])],RegisterModule)}();Object.defineProperty(n,"__esModule",{value:!0}),n.default=d},692:function(e,n,t){"use strict";var r=t(0),o=t(108),i=function(){function AuthService(e){this.http=e}return AuthService.prototype.setIsLoggedIn=function(e,n){e?window.localStorage.setItem("id_token",n):window.localStorage.removeItem("id_token"),this.isLoggedin=e},AuthService.prototype.loginfn=function(e){var n=this;this.isLoggedin=!1;var t=new o.Headers,r="username="+e.username+"&password="+e.password;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){n.http.post("/login",r,{headers:t}).subscribe(function(t){var r=t.json().id_token;r&&n.setIsLoggedIn(!0,r),e(n.isLoggedin)})})},AuthService.prototype.logoutfn=function(){var e=this;return new Promise(function(n){e.setIsLoggedIn(!1),n(e.isLoggedin)})},AuthService.prototype.registerfn=function(e){var n=this;this.isLoggedin=!1;var t=new o.Headers,r="username="+e.username+"&password="+e.password+"&confirmPassword="+e.confirmPassword;return t.append("Content-Type","application/X-www-form-urlencoded"),new Promise(function(e){n.http.post("/register",r,{headers:t}).subscribe(function(t){var r=t.json().id_token;r&&n.setIsLoggedIn(!0,r),e(n.isLoggedin)})})},AuthService=__decorate([r.Injectable(),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.Http&&o.Http)&&e||Object])],AuthService);var e}();n.AuthService=i},760:function(e,n,t){"use strict";var r=t(0),o=t(86),i=t(692),s=function(){function Register(e,n){this.service=e,this.router=n}return Register.prototype.register=function(e,n,t,r){var o=this;e.preventDefault(),this.service.registerfn({username:n,password:t,confirmPassword:r}).then(function(e){e?o.router.navigate(["/app/dashboard"]):console.log(e)})},Register=__decorate([r.Component({selector:"register",styles:[t(762)],template:t(772),encapsulation:r.ViewEncapsulation.None,host:{"class":"register-page app"},providers:[i.AuthService]}),__metadata("design:paramtypes",["function"==typeof(e="undefined"!=typeof i.AuthService&&i.AuthService)&&e||Object,"function"==typeof(n="undefined"!=typeof o.Router&&o.Router)&&n||Object])],Register);var e,n}();n.Register=s},762:function(e,n){e.exports="/***********************************/\n/**          REGISTER             **/\n/***********************************/\n.register-page {\n  background-color: #ddd; }\n\n.register-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .register-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-register-container {\n  padding-top: 10%; }\n\n.widget-register-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-register-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-register {\n  padding: 30px; }\n  .widget-register > header h1, .widget-register > header h2, .widget-register > header h3, .widget-register > header h4, .widget-register > header h5, .widget-register > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-register-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-register-info.abc-checkbox {\n    margin-left: -25px; }\n\n.register-form .form-control {\n  font-size: 13px;\n  border: none;\n  background-color: #eceeef; }\n  .register-form .form-control:focus {\n    background-color: #ddd; }\n"},772:function(e,n){e.exports='<div class="container">\n  <main id="content" class="widget-register-container" role="main">\n    <div class="row">\n      <div class="col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1">\n        <h5 class="widget-register-logo animated fadeInUp">\n          <i class="fa fa-circle text-gray"></i>\n          Task Force Cloud\n          <i class="fa fa-circle text-warning"></i>\n        </h5>\n        <section class="widget widget-register animated fadeInUp">\n          <header>\n            <h3>Register with Task Force Cloud</h3>\n          </header>\n          <div class="widget-body">\n            <p class="widget-register-info">\n              Use Facebook, Twitter or your email to sign in.\n            </p>\n            <p class="widget-register-info">\n              Don\'t have an account? Sign up now!\n            </p>\n            <form class="register-form mt-lg" role="form" (submit)="register($event, username.value, password.value, confirmPassword.value)">\n              <div class="form-group">\n                <input type="text" #username class="form-control" id="username" placeholder="Username">\n              </div>\n              <div class="form-group">\n                <input class="form-control" type="password" #password id="password" placeholder="Password">\n              </div>\n              <div class="form-group">\n                <input class="form-control" type="password" #confirmPassword id="confirmPassword" placeholder="Confirm Password">\n              </div>\n              <div class="clearfix">\n                <div class="btn-toolbar pull-xs-right m-t-1">\n                  <button class="btn btn-secondary btn-sm" [routerLink]="[\'/login\']">Back to Login</button>\n                  <button type="submit" class="btn btn-inverse btn-sm">Create Account</button>\n                </div>\n              </div>\n              <div class="row m-t-1">\n                <div class="col-md-6 push-md-6">\n                  <div class="clearfix">\n                    <div class="abc-checkbox widget-register-info pull-xs-right">\n                      <input type="checkbox" id="checkbox1" value="1">\n                      <label for="checkbox1">Keep me signed in </label>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="col-md-6 pull-md-6">\n                  <a class="mr-n-lg" href="#">Trouble with account?</a>\n                </div>\n              </div>\n            </form>\n          </div>\n        </section>\n      </div>\n    </div>\n  </main>\n  <footer class="page-footer">\n    2016 &copy; Task Force Cloud\n  </footer>\n</div>\n'}});