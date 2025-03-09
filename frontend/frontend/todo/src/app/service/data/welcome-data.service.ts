import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class HelloWorldBean{
  constructor(public message: string){}
}

@Injectable({
  providedIn: 'root'
})

export class WelcomeDataService {

  //will need  to inject http client from module
  constructor(private http: HttpClient) { }

  excecuteHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean");
  }

  //http://localhost:8080/hello-world-bean/monika28
  excecuteHelloWorldBeanPathVarService(name: string){

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    // })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/${name}`, 
    // {headers}
    );
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'admin'
  //   let password = 'admin123'
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

  //   return basicAuthHeaderString;
  // }

  // Access to XMLHttpRequest at 'http://localhost:8080/hello-world-bean/monika28' from origin 'http://localhost:4200' 
  // has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
  // No 'Access-Control-Allow-Origin' header is present on the requested resource.
}
