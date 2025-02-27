import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-number-keyboard',
  templateUrl: './number-keyboard.component.html',
  styleUrls: ['./number-keyboard.component.scss']
})
export class NumberKeyboardComponent implements OnChanges {
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public input?: string | number;
  @Output() public value: EventEmitter<string> = new EventEmitter();
  @Output() public validate: EventEmitter<void> = new EventEmitter();
  public inputValue = '';

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.inputValue = String(changes['input'].currentValue ?? '');
  }

  public getValue(value: string): void {
    this.inputValue += value;
    this.emitValue();
  }

  public clearValue(): void {
    this.inputValue = '';
    this.emitValue();
  }

  public backSpace(): void {
    this.inputValue = this.inputValue.slice(0, -1);
    this.emitValue();
  }

  public enter(): void {
    if(this.validateMinValue() || this.validateMaxValue()) {
      return;
    }
    this.validate.emit();
  }

  public validateMinValue(): boolean {
  
    if (!this.inputValue || this.inputValue === '0.00' || isNaN(Number(this.inputValue)) || (this.min !== undefined && this.inputValue.length < this.min)) {
      return true;
    }
  
    return false;
  }

  public validateMaxValue(): boolean {
  
    if (!this.inputValue || isNaN(Number(this.inputValue)) || (this.max !== undefined && this.inputValue.length > this.max)) {
      return true;
    }
  
    return false;
  }
  private emitValue() {
    this.value.emit(this.inputValue);
  }

}
