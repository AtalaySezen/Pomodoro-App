import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-pomotodo-todo',
  templateUrl: './pomotodo-todo.component.html',
  styleUrls: ['./pomotodo-todo.component.scss']
})
export class PomotodoTodoComponent {
  loader: boolean = false;
  todosArray: any[] = [];
  oldTodos: any[] = [];
  todosInput: string;
  constructor(private firebaseService: FirebaseService, private authService: AuthService, private snackbar: SnackbarService) { }

  ngOnInit() {
    this.getTodosData();
  }

  getTodosData() {
    this.loader = true;

    this.firebaseService.GetDataWithId('users', this.authService.userUid).subscribe((data: any) => {
      const allDatas = data.payload.data();
      this.todosArray = allDatas.todos.reverse();
      this.loader = false;
    })

    this.firebaseService.GetDataWithId('todosdone', this.authService.userUid).subscribe((data: any) => {
      this.oldTodos = [];
      const allTodos = data.payload.data();
      this.oldTodos = allTodos.todo;
    })

  }


  enterPressed(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.saveTodos();
    }
  }


  saveTodos() {
    const newTodo = this.todosInput;
    //#region Check todosArray has already same value:
    if (!this.todosArray.includes(newTodo)) {
      this.todosArray.push(newTodo);
      this.todosInput = '';
      let data = {
        todos: this.todosArray
      }
      //#endregion
      this.firebaseService.UpdateFirebaseData('/users/', this.authService.userUid, data);
      this.snackbar.openSnackBar('Added Successfully.', 'success', 'ok');
    } else {
      this.snackbar.openSnackBar('This data is already attached', 'info', 'ok');
    }
  }

  //#region Add Todo to firebase
  todoHasDone(item: string) {
    this.snackbar.openSnackBar('Successfully Done', 'success', 'ok');
    this.oldTodos.push(item);

    let data = {
      todo: this.oldTodos
    }

    this.firebaseService.addDataWithCustomUid('/todosdone/', this.authService.userUid, data);
    this.firebaseService.deleteDataFromArray('/users/', this.authService.userUid, 'todos', item)
      .then(() => {
        this.snackbar.openSnackBar('Successfully Deleted', 'success', 'ok');
      })
      .catch(error => {
        this.snackbar.openSnackBar('Error Deleting', 'error', 'ok');
        console.error('Delete error:', error);
      });

  }
  //#endregion

  deleteTodo(item: string) {
    this.firebaseService.deleteDataFromArray('/users/', this.authService.userUid, 'todos', item)
      .then(() => {
        this.snackbar.openSnackBar('Successfully Deleted', 'success', 'ok');
      })
      .catch(error => {
        this.snackbar.openSnackBar('Error Deleting', 'error', 'ok');
        console.error('Delete error:', error);
      });


  }




}
