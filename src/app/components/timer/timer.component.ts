import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpiryHMSFormat } from '../../helper/expiry-hms.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() public time!: ExpiryHMSFormat;
  @Output() public timeExpired: EventEmitter<boolean> = new EventEmitter(false);
  private interval!: number;
  public timer!: string;

  ngOnInit() {
    this.startTimer(this.time);
  }

  private startTimer(time: ExpiryHMSFormat) {
    let timer = time?.hour * 3600 + time?.minute * 60 + time?.second; 
    
    this.interval = window.setInterval(() => {
      const minutes = Math.floor((timer % 3600) / 60);
      const seconds = timer % 60;
      const hours = Math.floor(timer / 3600);
  
      const formattedTime =
        (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);
  
      this.timer = formattedTime;
  
      if (--timer < 0) {
        clearInterval(this.interval);
        this.timeExpired.emit(true);
      }
    }, 1000);
  }

}
