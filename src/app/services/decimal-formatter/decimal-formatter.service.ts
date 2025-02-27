import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DecimalFormatService {
  formatDecimal(input: string): string {
    let value = input.replace(/\D/g, ''); // Remove non-numeric characters

    if (!value) {
      return '0.00';
    }

    // Ensure the input starts from at least 0.01
    if (value.length === 1) {
      value = '0' + value;
    }

    // Convert raw input string into a formatted decimal number
    const numericValue = parseFloat(value) / 100;
    return numericValue.toFixed(2);
  }
}
