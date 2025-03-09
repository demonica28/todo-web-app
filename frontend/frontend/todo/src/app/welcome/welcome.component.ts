import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { response } from 'express';
import { NgIf } from '@angular/common';
import { stringify } from 'querystring';
@Component({
  selector: 'app-welcome',
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  message= "Welcome to my Todos";
  name = '';
  WelcomeMessageFromService: undefined;
  errorMessageFromSerivce: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService){
    this.name = this.route.snapshot.paramMap.get('name') || '';
  };

  getWelcomeMessage() {
    //console.log(this.service.excecuteHelloWorldBeanService());
    this.service.excecuteHelloWorldBeanService().subscribe(
      (response)=> this.handleSuccessfulResponse(response),
      (error)=> this.handleErrorResponse(error)
    );
      //console.log("last welcome message")
    }

    getWelcomeMessageWithParameter() {
      //console.log(this.service.excecuteHelloWorldBeanService());
      this.service.excecuteHelloWorldBeanPathVarService(this.name).subscribe(
        (response)=> this.handleSuccessfulResponse(response),
        (error)=> this.handleErrorResponse(error)
      );
        //console.log("last welcome message")
      }

  handleErrorResponse(error: any){
    // console.log(error.error);
    // console.log(error.error.message);
    this.errorMessageFromSerivce = error.error.message;
  }
  
handleSuccessfulResponse(response: any){
  // console.log(response);
  // console.log(response.message);
this.WelcomeMessageFromService = response.message;

}
  
  
}
