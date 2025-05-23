import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemList } from '../item-list';

@Component({
  selector: 'app-coupen-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CoupenDetailsComponent {
  @Input() public amount!: number;
  @Input() public charityName!: string;
  @Input() public items!: ItemList[];
  @Output() public process: EventEmitter<void> = new EventEmitter();
  @Output() public print: EventEmitter<void> = new EventEmitter();

  public processClick(): void {
    this.process.emit();
  }

  public printClick(): void {
    this.print.emit();
  }

}
