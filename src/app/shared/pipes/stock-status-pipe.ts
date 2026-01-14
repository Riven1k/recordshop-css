import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
  standalone: true
})
export class StockStatusPipe implements PipeTransform {

  transform(qty: number): string {
    if (qty > 3) return 'In Stock';
    if (qty >= 1) return 'Low Stock';
    return 'Out of Stock';
  }
}
