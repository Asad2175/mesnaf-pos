import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemList } from '../item-list';

@Component({
  selector: 'app-coupen-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CoupenDetailsComponent implements OnInit {
  @Input() public amount!: number;
  @Input() public items!: ItemList[];
  @Output() public process: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public processClick(): void {
    this.process.emit();
  }

}
