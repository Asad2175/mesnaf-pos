import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DecimalFormatService } from '../../services/decimal-formatter/decimal-formatter.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  public input = '0.00';
  @Input() public englishTitle = '';
  @Input() public arabicTitle = '';
  @Output() public goNext: EventEmitter<string> = new EventEmitter();

  constructor(private readonly decimalService: DecimalFormatService) { }

  ngOnInit() {
    document.getElementById('input')?.focus();
  }

  public getInputValue(event: string): void {
    this.input = this.formatNumber(event);
  }

  public getValue(): void {
    this.input = this.formatNumber(this.input);
  }

  private formatNumber(value: string) {
    return this.decimalService.formatDecimal(value);
  }

  public validateForm(): void{
    this.goNext.emit(this.input);
  }
}
