import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string = 'Username';

  constructor(private firebaseService: FirebaseService) {
    let userUid = localStorage.getItem('userUid');
    
    this.firebaseService.GetDataWithId('/users/',userUid).subscribe(async (res:any) => {
      const data = res.payload.data(); 
      this.userName = data.username;

    })

  
  }

  logOut() {
    this.firebaseService.Logout();
  }



}
