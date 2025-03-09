import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
// import { Router } from 'express';
import { Router} from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    username = "monika28";
    password = '';
    invalidLogin = false;
    
    constructor(private router: Router, 
      private hardcodedAuthenticationService: HardcodedAuthenticationService,
      private basicAuthenticationService: BasicAuthenticationService){};


    // handleLogin() {
    //   // console.log(this.username);
    //   // console.log(this.password);

    //   if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)){
    //     this.router.navigate(['welcome', this.username]);
    //     this.invalidLogin = false;
    //   }else{
    //     this.invalidLogin = true;
    //   }
    // }
    
    handleJWTAuthLogin() {
      // console.log(this.username);
      // console.log(this.password);

      this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
                  console.log(data)
                  this.router.navigate(['welcome', this.username])
                  this.invalidLogin = false
          },
          error => {
                  console.log(error)
                  this.invalidLogin = true
          }
        )
      }

    handleBasicAuthLogin() {
      // console.log(this.username);
      // console.log(this.password);

      this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
                  console.log(data)
                  this.router.navigate(['welcome', this.username])
                  this.invalidLogin = false
          },
          error => {
                  console.log(error)
                  this.invalidLogin = true
          }
        )
      }
    

}
