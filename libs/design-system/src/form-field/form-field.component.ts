import {
  Component,
  computed,
  ContentChild,
  effect,
  Signal,
} from '@angular/core';

import { SmtInputDirective } from '../input';

@Component({
  selector: 'smt-form-field',
  standalone: true,
  template: `
    <ng-content></ng-content>

    @if (hasError()) {
    <ng-content select="smt-input-error"></ng-content>
    } @else {
    <ng-content select="smt-input-hint"></ng-content>
    }
  `,
  host: {
    class: 'block space-y-1',
  },
})
export class SmtFormFieldComponent {
  @ContentChild(SmtInputDirective, { static: false })
  public input?: SmtInputDirective;

  public hasError: Signal<boolean> = computed(
    () => this.input?.hasError() ?? false
  );

  constructor() {
    effect(() => {
      if (!this.input) {
        throw new Error('smt-form-field must contain a smtInput.');
      }
    });
  }
}
