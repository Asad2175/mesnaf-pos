import { Directive, HostListener, ElementRef } from '@angular/core';
import { DecimalFormatService } from '../services/decimal-formatter/decimal-formatter.service';

@Directive({
  selector: '[appDecimalInput]',
})
export class DecimalInputDirective {
  constructor(private el: ElementRef, private decimalService: DecimalFormatService) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.decimalService.formatDecimal(input.value);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    if (event.key === 'Backspace' && input.value === '0.00') {
      event.preventDefault();
    }
  }
}
