import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoAlarma',
  standalone: true
})
export class TiempoAlarmaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.slice(11,16);
  }

}
