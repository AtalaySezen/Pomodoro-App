import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Subscription, interval } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.scss'],
})
export class PomoTimerComponent {
  loader: boolean = false;
  pomotodoTimer: string;
  minutes: number = 0;
  seconds: number = 4;
  timerStopped: boolean = false;
  pomodotoInput: string = '';
  pomotodosArray: any[] = [];
  startedTime: any;
  endedTime: any;
  timerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    window.addEventListener('visibilitychange', () => { this.checkContinuePomotodo() })
  }

  ngOnInit(): void {
    this.updateDisplay();
    this.checkContinuePomotodo();
    this.getPomotodoData();
  }

  ngOnDestroy() {
    this.checkContinuePomotodo();
  }

  getPomotodoData() {
    this.loader = true;
    this.firebaseService
      .GetDataWithId('users', this.authService.userUid)
      .subscribe(
        (data: any) => {
          const allDatas = data.payload.data();
          this.pomotodosArray = allDatas.pomotodos.reverse();
          this.loader = false;
        },
        (err) => {
          this.loader = false;
          console.log(err);
        }
      );
  }


  startTimer() {
    this.timerStopped = true;
    this.startedTime = new Date().getTime();
    this.endedTime = this.startedTime + (this.minutes * 60 * 1000 + this.seconds * 1000);
    // Local Storage
    localStorage.setItem('pomodoroStartTime', this.startedTime.toString());
    localStorage.setItem('pomodoroEndTime', this.endedTime.toString());

    const interval$ = interval(1000);

    this.timerSubscription = interval$.pipe(
      map((tick) => this.endedTime - new Date().getTime()),
      takeWhile((remainingTime) => remainingTime > 0),
      tap((remainingTime) => {
        this.minutes = Math.floor(remainingTime / (60 * 1000));
        this.seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        this.updateDisplay();
      })
    ).subscribe({
      complete: () => {
        console.log('Timer bitti');
        this.pomotodoTimer = 'Pomodoto Name?';
      }
    });
  }


  stopTimer() {
    // Local Storage'ı temizle
    localStorage.removeItem('pomodoroStartTime');
    localStorage.removeItem('pomodoroEndTime');
    console.log("ok");

    // RxJS 
    if (this.timerSubscription) {
      console.log("rxjs")
      this.timerStopped = false;
      this.timerSubscription.unsubscribe();
      this.clearInterval();
      this.updateDisplay();
    }
  }

  clearInterval() {
    this.minutes = 25;
    this.seconds = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    this.pomotodoTimer = `${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  checkContinuePomotodo() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));
    if (startTime && endTime) {
      const currentTime = new Date().getTime();
      console.log("ok");

      if (currentTime < endTime) {
        const remainingTime = endTime - currentTime;
        this.minutes = Math.floor(remainingTime / 60000);
        this.seconds = Math.floor((remainingTime % 60000) / 1000);
        this.startTimer();
      }
    }
  }

  enterPressed(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.savePomotodo(); //
      this.stopTimer();
      this.timerStopped = false;
    }
  }

  savePomotodo() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));

    const pomodotoData = {
      name: this.pomodotoInput,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    };

    this.pomotodosArray.push(pomodotoData);

    let pomotodoData = {
      pomotodos: this.pomotodosArray
    }

    this.firebaseService.UpdateFirebaseData('/users/', this.authService.userUid, pomotodoData)
      .then(() => {
        this.stopTimer();
      })
      .catch((error) => {
        console.error('hata oluştu: ' + error);
      });
  }


}






