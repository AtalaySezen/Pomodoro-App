import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.scss']
})
export class PomoTimerComponent {
  selectedTime: number = 1;
  timerInterval: any;
  minutes: number = this.selectedTime;
  seconds: number = 0;
  pomoName: string = '';
  timerRunning: boolean = false;
  pomotodoTimer: string = `${this.minutes}:${this.seconds}`;
  startButton: boolean = true;
  disableInput: boolean = true;
  loader: boolean = false;
  timerStopped: boolean = false;
  pomotodosArray: any[] = [];

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  generateUniqueId(): any {
    return uuidv4();
  }

  ngOnInit() {
    this.loader = true;
    this.firebaseService.GetDataWithId('users', this.authService.userUid).subscribe((data: any) => {
      const allDatas = data.payload.data();
      this.pomotodosArray = allDatas.pomotodos.reverse();
      this.loader = false;
    })
  }


  startTimer() {
    this.startButton = false;
    let currentDate = new Date();

    let pomotodo = {
      started_at: currentDate,
      ended_at: currentDate,
      status: 'started',
      id: this.generateUniqueId()
    }

    this.authService.setLocalStorage('last_pomo_status', JSON.stringify(pomotodo));

    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      this.pomotodoTimer = `${this.minutes}:${this.seconds}`;

      if (this.minutes === 0 && this.seconds === 0) {
        alert("done");
        this.disableInput = false;
        this.timerRunning = false;
        this.timerStopped = true;
        clearInterval(this.timerInterval);
      }

      if (this.minutes > 0 || this.seconds > 0) {
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }
    }, 1000);

  }


  stopTimer() {
    this.minutes = this.selectedTime;
    this.seconds = 0;
    this.startButton = true;
    this.timerRunning = false;
    this.timerStopped = false;
    clearInterval(this.timerInterval);
  }


  checkUserStartedPomo() {
  }

  enterPressed(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.savePomotodo(); // 
    }
  }


  savePomotodo() {
    this.pomotodosArray.push(this.pomoName);
    this.pomoName = '';

    let data = {
      pomotodos: this.pomotodosArray
    }

    this.firebaseService.UpdateFirebaseData('/users/', this.authService.userUid, data);
    this.stopTimer();

  }





}
