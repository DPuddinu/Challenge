import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightUnit',
  standalone: true
})
export class WeightUnitPipe implements PipeTransform {
  transform(value: number, unit: 'kg' | 'lbs' = 'kg'): string {
    if (isNaN(value)) return 'Invalid input';
    
    if (unit === 'kg') {
      return `${value} kg`;
    } else {
      // Convert kg to lbs (1 kg = 2.20462 lbs)
      const lbs = value * 2.20462;
      return `${lbs.toFixed(2)} lbs`;
    }
  }
} 