import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressCropper',
})
export class AddressCropperPipe implements PipeTransform {
  addressMaxLength: number = 50;
  separator: string = '...';
  transform(address: string): string {
    const sepLen = this.separator.length;
    const charsToShow = this.addressMaxLength - sepLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return (
      address.substring(0, frontChars) +
      this.separator +
      address.substring(address.length - backChars)
    );
  }
}
