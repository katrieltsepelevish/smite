import { Component, input, computed } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const menuVariants = cva(
  'block border-border min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in-out my-0.5',
  {
    variants: {},
    defaultVariants: {},
  }
);

export type MenuVariants = VariantProps<typeof menuVariants>;

@Component({
  selector: 'smt-menu',
  standalone: true,
  template: `<ng-content></ng-content> `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtMenuComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(menuVariants(), this.overrideClass()))
  );
}
