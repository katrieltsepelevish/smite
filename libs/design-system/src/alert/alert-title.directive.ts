import { Directive, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const alertTitleVariants = cva('text-sm leading-none tracking-tight', {
  variants: {},
});

export type AlertTitleVariants = VariantProps<typeof alertTitleVariants>;

@Directive({
  selector: '[smtAlertTitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAlertTitleDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(alertTitleVariants(), this.overrideClass()))
  );
}
