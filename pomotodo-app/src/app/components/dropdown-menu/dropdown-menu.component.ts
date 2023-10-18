import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, CommonModule, AppRoutingModule, MatIconModule]
})
export class DropdownMenuComponent {
  userName: string = '';

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.getUserDatas();
  }

  getUserDatas() {
    this.firebaseService.GetDataWithId('/users/', this.authService.userUid).subscribe(async (res: any) => {
      const data = res.payload.data();
      this.userName = data.username;
    }, err => {
      console.log(err);
    })
  }

  logOut() {
    this.authService.Logout();
  }



}
