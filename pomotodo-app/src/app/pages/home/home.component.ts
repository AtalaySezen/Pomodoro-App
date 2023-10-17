import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string = '';

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserDatas();
  }

  logOut() {
    this.firebaseService.Logout();
  }

  getUserDatas() {
    this.firebaseService.GetDataWithId('/users/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      this.userName = data.username;
    })
  }



}
