import { Component, computed, input } from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'smt-menu-separator',
  standalone: true,
  template: ``,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtMenuSeparatorComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx('block -mx-1 my-1 h-px bg-muted', this.overrideClass()))
  );
}
