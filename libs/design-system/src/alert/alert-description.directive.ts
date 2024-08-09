import { Directive, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed', {
  variants: {},
});

export type AlertDescriptionVariants = VariantProps<
  typeof alertDescriptionVariants
>;

@Directive({
  selector: '[smtAlertDescription]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAlertDescriptionDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(alertDescriptionVariants(), this.overrideClass()))
  );
}
