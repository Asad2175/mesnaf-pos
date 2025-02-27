import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent implements OnInit {
  @Output() public back: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public goBack(): void {
    this.back.emit();
  }

}
