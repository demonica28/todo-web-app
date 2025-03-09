import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot} from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if(this.hardcodedAuthenticationService.isUserLoggedIn()){
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
}
