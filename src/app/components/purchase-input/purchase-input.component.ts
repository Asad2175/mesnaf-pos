import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-purchase-input',
  templateUrl: './purchase-input.component.html',
  styleUrls: ['./purchase-input.component.scss']
})
export class PurchaseInputComponent implements OnInit {
  @Input() public englishTitle = '';
  @Input() public arabicTitle = '';
  @Input() public minValue?: number;
  @Input() public maxValue?: number;
  @Input() public error?: string = '';
  @Output() public goNext: EventEmitter<number> = new EventEmitter();
  public input!:number;

  ngOnInit() {
    document.getElementById('input')?.focus();
  }

  public getInputValue(event: number | string): void {
    this.input = Number(event);
  }

  public validateForm(): void{
    this.goNext.emit(this.input);
  }
}
