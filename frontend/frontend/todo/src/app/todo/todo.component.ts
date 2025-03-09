import { Component } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todos } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  providers: [DatePipe]
})
export class TodoComponent {
private id:number=0;
todo: Todos=new Todos(this.id, '', new Date(), false);


constructor(private todoService:TodoDataService,
  private route:ActivatedRoute,
  private datePipe: DatePipe,
  private router: Router){

  this.id = this.route.snapshot.params['id'];
    if(this.id!=-1){
      this.todoService.retrieveTodo("monika28", this.id).subscribe(
        data=> {
    
                if(data.targetDate){
                  data.targetDate = this.transformDate(data.targetDate);
                }
                this.todo = data
        });
    }
  }

saveTodo() {

  if (this.todo.targetDate instanceof Date) {
    this.todo.targetDate = this.transformDate(this.todo.targetDate); // Convert to `yyyy-MM-dd`
  }

  console.log(typeof this.id, ' ', this.id)
  
  if(Number(this.id) === -1 || Number(this.id) === 0){
    //create todo method call
    this.todoService.createTodo("monika28", this.todo).subscribe(
      data => {
              console.log('todo created', data);
              this.router.navigate(['todos'])
      },
      error => console.log('error creating todo ', error)
    )
  }else{
    //update todo
    this.todoService.updateTodo("monika28", this.id, this.todo).subscribe(
      data => {
              console.log('todo updated', data);
              this.router.navigate(['todos'])
      },
      error => console.log('error updating todo ', error)
    )
  }
}

transformDate(isoDate: string | Date): string{
  return this.datePipe.transform(isoDate, 'yyyy-MM-dd') || '';
}
}
