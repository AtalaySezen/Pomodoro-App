import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string = 'Username'
  constructor(private firebaseService: FirebaseService) { }

  logOut() {
    this.firebaseService.Logout();
  }



}
