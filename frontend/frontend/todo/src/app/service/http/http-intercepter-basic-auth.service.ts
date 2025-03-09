import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // let username = 'admin'
    // let password = 'admin123'
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    // console.log("basicAuthHeaderString: ", basicAuthHeaderString);
    // console.log("username: ", username);

    if(basicAuthHeaderString && username){
      req = req.clone({
        setHeaders :{
            Authorization: basicAuthHeaderString
        }
      });
    }
    
    
    // console.log("Request Headers After:", req.headers);

    return next.handle(req); //added auth header and send request to next http handler
  }
}
