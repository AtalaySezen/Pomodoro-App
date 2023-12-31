import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PomodoroModel, todosTable } from 'src/app/shared/models/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  numberOfFinishedTodos: number = 0;
  numberOfFinishedPomotodos: number = 0;
  pomodorosColumns: string[] = ['date', 'startTime', 'endTime'];
  todosColumns: string[] = ['name'];
  showPomodoroTable: boolean = false;
  showTodosTable: boolean = false;
  pomodorosTable = new MatTableDataSource<PomodoroModel>();
  todosTable = new MatTableDataSource<todosTable>();
  @ViewChild('paginatorPomodoro') paginatorPomodoro: MatPaginator;
  @ViewChild('paginatorTodo') paginatorTodo: MatPaginator;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserDatas();
    this.getFinishedTodos();
  }


  getUserDatas() {
    this.firebaseService.GetDataWithId('/users/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      this.pomodorosTable = await new MatTableDataSource(data.pomotodos);
      this.pomodorosTable.paginator = await this.paginatorPomodoro;
      this.numberOfFinishedPomotodos = await data.pomotodos.length || 0;
    }, err => {
      console.log(err);
    })
  }

  getFinishedTodos() {
    this.firebaseService.GetDataWithId('/todosdone/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      this.todosTable = await new MatTableDataSource(data.todo);
      this.todosTable.paginator = await this.paginatorTodo;
      this.numberOfFinishedTodos = await data?.todo.length || 0;
    }, err => {
      console.log(err);
    })
  }



}
