import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Subscription, interval } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.scss'],
})
export class PomoTimerComponent {
  loader: boolean = false;
  timerStopped: boolean = false;
  pomodoroTimer: string;
  pomodoroInput: string = '';
  selectedTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  totalTimeInSeconds: number = 0;
  pomodorosArray: any[] = [];
  startedTime: any;
  endedTime: any;
  timerSubscription: Subscription;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.checkContinuePomodoro();
    this.getPomodoroData();
  }


  getPomodoroData() {
    this.loader = true;
    this.firebaseService
      .GetDataWithId('users', this.authService.userUid)
      .subscribe(
        (data: any) => {
          const allDatas = data.payload.data();
          this.selectedTime = allDatas.pomotodoTime;
          this.pomodorosArray = allDatas.pomotodos.reverse();
          this.pomodoroTimer = `${allDatas.pomotodoTime}:00`
          this.loader = false;
        },
        (err) => {
          this.loader = false;
          console.log(err);
        }
      );
  }


  startTimer(localStorageTimer?: number) {
    this.timerStopped = true;

    if (!localStorageTimer) {
      this.startedTime = new Date().getTime();
      this.endedTime = this.startedTime + this.selectedTime * 60000
      this.totalTimeInSeconds = this.selectedTime * 60;
      this.setPomodoroLocalStorage();
    } else {
      this.totalTimeInSeconds = localStorageTimer * 60;
    }

    this.timerSubscription = interval(1000)
      .pipe(
        map((timer) => this.totalTimeInSeconds - timer),
        takeWhile((timer) => timer >= 0),
        take(1500)
      )
      .subscribe((timer) => {
        const dakika = Math.floor(timer / 60);
        const saniyeKalan = timer % 60;
        if (timer > 0) {
          this.pomodoroTimer = `${dakika}:${saniyeKalan < 10 ? '0' : ''}${saniyeKalan}`;
        } else {
          this.userFinishedPomodoro();
        }
      });

  }


  stopTimerButton() {
    this.clearPomodoroLocalStorage();
    if (this.timerSubscription) {
      this.timerStopped = false;
      this.pomodoroTimer = `${this.selectedTime}:00`;
      this.timerSubscription.unsubscribe();
    }
  }


  userFinishedPomodoro() {
    this.pomodoroTimer = 'Pomodoto Name?';
  }


  setPomodoroLocalStorage() {
    if (typeof this.startedTime === 'undefined' || typeof this.endedTime === 'undefined') {
      return;
    }
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    if (!startTime) {
      localStorage.setItem('pomodoroStartTime', this.startedTime.toString());
      localStorage.setItem('pomodoroEndTime', this.endedTime.toString());
    }
  }


  clearPomodoroLocalStorage() {
    localStorage.removeItem('pomodoroStartTime');
    localStorage.removeItem('pomodoroEndTime');
  }


  enterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.savePomodoro(); //
      this.stopTimerButton();
      this.timerStopped = false;
    }
  }

  savePomodoro() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));
    const pomodotoData = {
      name: this.pomodoroInput,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    this.pomodorosArray.push(pomodotoData);

    let pomodoroData = {
      pomotodos: this.pomodorosArray,
    };

    this.firebaseService
      .UpdateFirebaseData('/users/', this.authService.userUid, pomodoroData)
      .then(() => {
        this.stopTimerButton();
        this.pomodoroInput = '';
      })
      .catch((error) => {
        console.error('hata oluştu: ' + error);
      });
  }


  checkContinuePomodoro() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));
    if (startTime && endTime) {
      this.startPomodoroTimer();
    }
  }

  startPomodoroTimer() {
    const storedEndTime = Number(localStorage.getItem('pomodoroEndTime'));
    let timeEnd = new Date(storedEndTime).valueOf();
    let timeCurrent = new Date().valueOf();

    const timeDifferenceInMilliseconds = timeEnd - timeCurrent;
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    this.totalTimeInSeconds = timeDifferenceInMilliseconds * 60;
    this.startTimer(Math.floor(timeDifferenceInMinutes));

  }




}
