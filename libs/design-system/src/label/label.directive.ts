import { computed, Directive, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const labelVariants = cva('text-sm font-medium leading-none', {
  variants: {},
  defaultVariants: {},
});

export type LabelVariants = VariantProps<typeof labelVariants>;

@Directive({
  selector: 'label[smtLabel]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtLabelDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected readonly _ngControl = inject(NgControl, { optional: true });

  protected _computedClass = computed(() =>
    twMerge(clsx(labelVariants(), this.overrideClass()))
  );
}
