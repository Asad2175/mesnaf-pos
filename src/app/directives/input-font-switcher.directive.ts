import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFontSwitcher]'
})
export class InputFontSwitcherDirective {

  constructor(private readonly el: ElementRef) { }

  @HostListener('input') onInput() {
    const inputElement = this.el.nativeElement;
    const text = inputElement.value?.trim();

    if (text.length === 0) {
      inputElement.style.fontFamily = "'Axiforma', sans-serif";
      return;
    }
 
    if (/^[\u0600-\u06FF]/.test(text)) {
      inputElement.style.fontFamily = "'Droid Arabic Kufi', sans-serif";
    } else {
      inputElement.style.fontFamily = "'Axiforma', sans-serif";
    }
  }

}
