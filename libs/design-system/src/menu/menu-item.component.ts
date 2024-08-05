import { Component, computed, Input, input, signal } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const menuItemVariants = cva(
  'group w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;

@Component({
  selector: 'smt-menu-item',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtMenuItemComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _variant = signal<MenuItemVariants['variant']>('default');
  @Input()
  set variant(variant: MenuItemVariants['variant']) {
    this._variant.set(variant);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(menuItemVariants({ variant: this._variant() }), this.overrideClass())
    )
  );
}
