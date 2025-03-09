import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { PassThrough } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username:string, password:string){
    if (username === "monika28" && password === "dummy") {
        sessionStorage.setItem('authenticateUser', username);
        return true;
    } else {
        return false;
    }
  }
  isUserLoggedIn(){
      let user = sessionStorage.getItem('authenticateUser');
      return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('authenticateUser');
  }
}
