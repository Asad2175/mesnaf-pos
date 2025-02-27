import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent {
  @Output() public back: EventEmitter<void> = new EventEmitter();

  public goBack(): void {
    this.back.emit();
  }

}
