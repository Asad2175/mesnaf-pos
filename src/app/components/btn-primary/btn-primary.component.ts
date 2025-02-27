import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.scss']
})
export class BtnPrimaryComponent {
  @Input() public englishLabel: string = '';
  @Input() public arabicLabel: string = '';
  @Input() public type: string = 'primary';
  @Input() public inputType: string = 'button';
  @Output() public clicked: EventEmitter<void> = new EventEmitter();

  public onClick() {
    this.clicked.emit();
  }

}
