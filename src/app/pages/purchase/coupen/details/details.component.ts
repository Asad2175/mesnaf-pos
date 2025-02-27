import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coupen-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CoupenDetailsComponent implements OnInit {
  @Output() public process: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public processClick(): void {
    this.process.emit();
  }

}
