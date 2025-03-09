import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { PassThrough } from 'stream';
import { API_URL } from '../app.constants';

export const AUTHENTICATED_USER = 'authenticateUser';
export const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http:HttpClient) { }

  // authenticate(username:string, password:string){
  //   if (username === "monika28" && password === "dummy") {
  //       sessionStorage.setItem('authenticateUser', username);
  //       return true;
  //   } else {
  //       return false;
  //   }
  // }

  executeJWTAuthenticationService(username:string, password:string){

    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    
    // let headers = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    // })
    
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username,
      password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          console.log(sessionStorage.getItem('authenticateUser'));

          return data;
        }
      )
    );
  }
  
  
  executeAuthenticationService(username:string, password:string){

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    
    let headers = new HttpHeaders({
        Authorization: basicAuthHeaderString
    })
    
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          console.log(sessionStorage.getItem('authenticateUser'));

          return data;
        }
      )
    );
  }

  

  getAuthenticatedUser(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
    return null;
    }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
      return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean{

  constructor (public message: String){ }
}