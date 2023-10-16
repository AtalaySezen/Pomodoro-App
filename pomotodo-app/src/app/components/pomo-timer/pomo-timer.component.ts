import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.scss']
})
export class PomoTimerComponent {
  selectedTime: number = 25;
  remainingTime: number = 0;
  timerRunning: boolean = false;
  intervalId: any;

  constructor() { }

  generateUniqueId(): any {
    return uuidv4();
  }


  startTimer() {
    let date = Date();

    let pomotodo = {
      started_at: date,
      ended_at: date + 25000,
      status: 'started',
      id: this.generateUniqueId()
    }
    localStorage.setItem('last_pomo_status', JSON.stringify(pomotodo));


    console.log(date);
    this.remainingTime = this.selectedTime * 60;
    this.timerRunning = true;
    this.intervalId = setInterval(() => {
      // console.log(this.remainingTime);
      this.remainingTime--;
      if (this.remainingTime === 0) {
        clearInterval(this.intervalId);
        this.timerRunning = false;
        alert('Zaman doldu! Mola verin.');
      }
    }, 1000);
  }

  updateRemainingTime(newTime: number) {
    this.remainingTime = newTime * 60;
  }

  stopTimer() {
    this.timerRunning = false;
    this.remainingTime = 0;
    clearInterval(this.intervalId);

  }

  formatRemainingTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


}
