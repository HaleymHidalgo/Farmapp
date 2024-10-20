import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusAlarma',
  standalone: true
})
export class StatusAlarmaPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return !value ? 'No tomada 💔' : 'Tomada ✔';
  }

}
