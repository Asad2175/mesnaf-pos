import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFontSwitcher]'
})
export class FontSwitcherDirective implements AfterViewInit {

  constructor(private readonly el: ElementRef) { }

  ngAfterViewInit() {
    this.applyFont();
  }

  private applyFont(): void {
    const element = this.el.nativeElement;
    const text = element.innerText?.trim();

    if (text.length === 0) {
      element.style.fontFamily = "'Axiforma', sans-serif";
      return;
    }

    if (/^[\u0600-\u06FF]/.test(text)) {
      element.style.fontFamily = "'Droid Arabic Kufi', sans-serif";
    } else {
      element.style.fontFamily = "'Axiforma', sans-serif";
    }
  }
}
