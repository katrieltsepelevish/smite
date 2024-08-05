import { Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cardContentVariants = cva('block p-6 pt-0', {
  variants: {},
  defaultVariants: {},
});

export type CardContentVariants = VariantProps<typeof cardContentVariants>;

@Component({
  selector: 'smt-card-content',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardContentComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(cardContentVariants(), this.overrideClass()))
  );
}
