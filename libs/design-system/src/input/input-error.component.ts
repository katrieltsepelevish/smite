import { Component, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const inputErrorVariants = cva(
  'block text-destructive text-xs font-medium',
  {
    variants: {},
    defaultVariants: {},
  }
);
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Component({
  selector: 'smt-input-error',
  standalone: true,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtInputErrorComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(inputErrorVariants(), this.overrideClass()))
  );
}
