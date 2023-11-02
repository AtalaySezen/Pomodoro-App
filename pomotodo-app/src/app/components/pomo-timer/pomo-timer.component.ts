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
  pomotodoTimer: string;
  selectedTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timerStopped: boolean = false;
  pomodotoInput: string = '';
  pomotodosArray: any[] = [];
  startedTime: any;
  endedTime: any;
  timerSubscription: Subscription;
  totalTimeInSeconds: number = 0;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
    window.addEventListener('visibilitychange', () => {
      // this.checkContinuePomotodo();
    });
  }

  ngOnInit(): void {
    // this.checkContinuePomotodo();
    this.getPomotodoData();
  }


  getPomotodoData() {
    this.loader = true;
    this.firebaseService
      .GetDataWithId('users', this.authService.userUid)
      .subscribe(
        (data: any) => {
          const allDatas = data.payload.data();
          this.selectedTime = allDatas.pomotodoTime;
          this.totalTimeInSeconds = allDatas.pomotodoTime * 60;
          this.pomotodosArray = allDatas.pomotodos.reverse();
          this.pomotodoTimer = `${allDatas.pomotodoTime}:00`
          this.loader = false;
        },
        (err) => {
          this.loader = false;
          console.log(err);
        }
      );
  }


  startTimer() {
    this.startedTime = new Date().getTime();
    this.endedTime = this.startedTime + this.totalTimeInSeconds * 1000;
    this.timerStopped = true;

    this.setPomotodoLocalStorage();

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
          this.pomotodoTimer = `${dakika}:${saniyeKalan < 10 ? '0' : ''}${saniyeKalan}`;
        } else {
          this.userFinishedPomotodo();
        }
      });
  }


  stopTimerButton() {
    this.clearPomotodoLocalStorage();
    if (this.timerSubscription) {
      this.timerStopped = false;
      this.pomotodoTimer = `${this.selectedTime}:00`;
      this.timerSubscription.unsubscribe();
    }
  }


  userFinishedPomotodo() {
    this.pomotodoTimer = 'Pomodoto Name?';
  }


  setPomotodoLocalStorage() {
    if (typeof this.startedTime === 'undefined' || typeof this.endedTime === 'undefined') {
      return;
    }
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    if (!startTime) {
      localStorage.setItem('pomodoroStartTime', this.startedTime.toString());
      localStorage.setItem('pomodoroEndTime', this.endedTime.toString());
    }
  }


  clearPomotodoLocalStorage() {
    localStorage.removeItem('pomodoroStartTime');
    localStorage.removeItem('pomodoroEndTime');
  }


  enterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.savePomotodo(); //
      this.stopTimerButton();
      this.timerStopped = false;
    }
  }

  savePomotodo() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));
    const pomodotoData = {
      name: this.pomodotoInput,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    this.pomotodosArray.push(pomodotoData);

    let pomotodoData = {
      pomotodos: this.pomotodosArray,
    };

    this.firebaseService
      .UpdateFirebaseData('/users/', this.authService.userUid, pomotodoData)
      .then(() => {
        this.stopTimerButton();
        this.pomodotoInput = '';
      })
      .catch((error) => {
        console.error('hata oluştu: ' + error);
      });
  }


  checkContinuePomotodo() {
    const startTime = Number(localStorage.getItem('pomodoroStartTime'));
    const endTime = Number(localStorage.getItem('pomodoroEndTime'));
    if (startTime && endTime) {
      // this.startPomotodoTimer();
    }
  }


  // startPomotodoTimer() {
  //   const storedStartTime = Number(localStorage.getItem('pomodoroStartTime'));
  //   const storedEndTime = Number(localStorage.getItem('pomodoroEndTime'));

  //   if (storedStartTime && storedEndTime) {
  //     const currentTime = new Date().getTime();
  //     const remainingTimeInSeconds = Math.floor((storedEndTime - currentTime) / 1000);

  //     if (remainingTimeInSeconds > 0) {
  //       this.totalTimeInSeconds = remainingTimeInSeconds;
  //       this.startedTime = storedStartTime;
  //       this.endedTime = storedEndTime;
  //       this.timerStopped = true;
  //     } else {
  //       this.totalTimeInSeconds = this.minutes * 60 + this.seconds;
  //       this.startedTime = new Date().getTime();
  //       this.endedTime = this.startedTime + this.totalTimeInSeconds * 1000;
  //       this.timerStopped = true;

  //       // Yerel depoya başlama ve bitiş zamanlarını kaydet
  //       this.setPomotodoLocalStorage();
  //     }

  //     this.timerSubscription = interval(1000)
  //       .pipe(
  //         map((timer) => this.endedTime - new Date().getTime() - timer * 1000),
  //         takeWhile((timer) => timer >= 0),
  //         take(1500)
  //       )
  //       .subscribe((timer) => {
  //         const dakika = Math.floor(timer / 60);
  //         const saniyeKalan = timer % 60;
  //         if (timer > 0) {
  //           console.log(`${dakika}:${saniyeKalan < 10 ? '0' : ''}${saniyeKalan}`);
  //         } else {
  //           console.log("Süre bitti!");
  //         }
  //       });
  //   }
  // }




}
