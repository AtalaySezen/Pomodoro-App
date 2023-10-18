import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  numberOfFinishedTodos: number = 0;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserDatas();
    this.getFinishedTodos();
  }


  getUserDatas() {
    this.firebaseService.GetDataWithId('/users/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      console.log(data);
    }, err => {
      console.log(err);
    })


  }

  getFinishedTodos() {
    this.firebaseService.GetDataWithId('/todosdone/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      this.numberOfFinishedTodos = data.todo.length;
    }, err => {
      console.log(err);
    })

  }



}
