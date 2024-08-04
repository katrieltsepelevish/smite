import { Directive, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cardTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;

@Directive({
  selector: '[smtCardTitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardTitleDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(cardTitleVariants(), this.overrideClass()))
  );
}
