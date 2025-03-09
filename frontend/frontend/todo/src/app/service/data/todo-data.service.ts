import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todos } from '../../list-todos/list-todos.component';
import { API_URL, TODO_JPA_API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { 

  }

  retrieveAllTodos(username: string){
    console.log("this is admin", username);
    return this.http.get<Todos[]>(`${TODO_JPA_API_URL}/users/${username}/todos`);
    //return this.http.get<Todos[]>(`${API_URL}/users/${username}/todos`);
  }

  deleteTodo(id: number, username: string){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username: string, id:number){
    return this.http.get<Todos>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
    //return this.http.get<Todos>(`${API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username: string, id:number, todo:Todos){
    return this.http.put(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username: string, todo:Todos){
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/todos`, todo);
  }

}
