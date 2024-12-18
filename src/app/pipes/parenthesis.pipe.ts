import { Pipe, PipeTransform } from '@angular/core';

type ParenthesisType = 'round' | 'square' | 'curly' | 'angle';

@Pipe({
  name: 'parenthesis',
  standalone: true
})
export class ParenthesisPipe implements PipeTransform {
  private readonly parenthesisMap: Record<ParenthesisType, [string, string]> = {
    round: ['(', ')'],
    square: ['[', ']'],
    curly: ['{', '}'],
    angle: ['<', '>']
  };

  transform(value: number | string, type: ParenthesisType = 'round'): string {
    const [opening, closing] = this.parenthesisMap[type];
    return `${opening}${value}${closing}`;
  }
} 