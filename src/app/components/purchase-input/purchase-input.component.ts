import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

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
  @Input() public type?: string = 'number';
  @Output() public goNext: EventEmitter<number> = new EventEmitter();
  @Output() public goNextString: EventEmitter<string> = new EventEmitter();
  public input!:number;
  public inputString!:string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent() {
    this.focus();
  }

  ngOnInit() {
    this.focus();
  }

  private focus(): void {
    document.getElementById('input')?.focus();
  }

  public getInputValue(event: number | string): void {
    if (this.type === 'number') {
      this.input = Number(event);
    } else {
      this.inputString = String(event);
    }
  }

  public validateForm(): void{
    this.goNext.emit(this.input);
  }

  
  public validateStringForm(): void{
    this.goNextString.emit(this.inputString);
  }
}
