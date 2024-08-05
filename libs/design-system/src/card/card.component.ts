import { Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cardVariants = cva(
  'block rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card-foreground shadow-sm',
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;

@Component({
  selector: 'smt-card',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(cardVariants(), this.overrideClass()))
  );
}
