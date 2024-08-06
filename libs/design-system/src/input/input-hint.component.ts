import { Component, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const inputHintVariants = cva('block text-xs text-muted-foreground', {
  variants: {},
  defaultVariants: {},
});

export type InputHintVariants = VariantProps<typeof inputHintVariants>;

@Component({
  selector: 'smt-input-hint',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtInputHintComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(inputHintVariants(), this.overrideClass()))
  );
}
