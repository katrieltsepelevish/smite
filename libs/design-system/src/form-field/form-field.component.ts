import { Component } from '@angular/core';

@Component({
  selector: 'smt-form-field',
  standalone: true,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'block space-y-1',
  },
})
export class SmtFormFieldComponent {}
