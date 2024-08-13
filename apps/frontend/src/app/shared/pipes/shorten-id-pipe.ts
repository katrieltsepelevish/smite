import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenId',
  standalone: true,
})
export class ShortenIdPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    return value.slice(-8);
  }
}
