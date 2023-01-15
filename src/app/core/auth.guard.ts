import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  afAuth: any;
  router: Router;

  constructor(_afAuth: AngularFireAuth, rt: Router){
    this.afAuth = _afAuth;
    this.router = rt;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const user = await this.afAuth.currentUser;
      const isAuthenticated = user ? true : false;
      if(!isAuthenticated){
        alert('You must be logged in order to access this page');
        this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }
  
}
