import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AppAuth implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    //if (tokenNotExpired('id_token')) {
      return true;
    //}

    // this.router.navigate(['/login']);
    // return false;
    //return true;
  }
}
