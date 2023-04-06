import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class MenuResponsePipe implements PipeTransform {
  transform(value: any) {
    if (Array.isArray(value)) {
      return this.formatArray(value);
    } else if (Object.keys(value).length > 0) {
      return this.format(value);
    }
    return value;
  }

  formatArray(arr) {
    return arr.map((item) => this.format(item));
  }

  format(value) {
    const formattedValue = { ...value };
    if (formattedValue.menu) {
      formattedValue.menuName = formattedValue.menu.name;
      delete formattedValue.menu;
    }
    return formattedValue;
  }
}
