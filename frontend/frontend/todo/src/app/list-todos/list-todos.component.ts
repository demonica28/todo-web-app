import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';


export class Todos{
  public id: number;
  public description: string;
  public targetDate: Date | string;
  public isCompleted: boolean;
  
  constructor(id: number = 0, description: string, targetDate: string | Date, isCompleted: boolean){
    this.id = id;
    this.description = description;
    this.targetDate = targetDate;
    this.isCompleted = isCompleted;
  };
}

@Component({
  selector: 'app-list-todos',
  imports: [NgIf, NgFor, UpperCasePipe, DatePipe],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent {

todos: Todos[] | undefined;
  message: string | undefined;
//[
//         {id: 1, description: "Learn Angular"},
//         {id: 2, description: "Visit India"}
// ]
  
//  todos = [
//   new Todos(1, 'Visit India', new Date(), false),
//   new Todos(2, 'Expert in Angular', new Date(), false)
//  ]

constructor(private todoService: TodoDataService,
            private router:Router,
            private basicAuthenticationService: BasicAuthenticationService){

                this.refreshTodos();
}

refreshTodos(){
  this.todoService.retrieveAllTodos("monika28").subscribe(
    response=> {
      this.todos = response;
      console.log(response);
    }
  ) 
}

deleteTodo(id: number){
  console.log(`delete todo ${id}`);
   this.todoService.deleteTodo(id, "monika28").subscribe(
     response=>{
      console.log(response);
      this.message = `Delete of Todo ${id} Successfull!`
      this.refreshTodos();
     }
  )
}

updateTodo(id:number) {
  console.log(`updated ${id}`);
  this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
    }

}
