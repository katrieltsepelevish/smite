import { Directive, Input, computed, input, signal } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const badgeVariants = cva(
  'inline-flex items-center border rounded-full px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary border-transparent text-primary-foreground',
        secondary: 'bg-secondary border-transparent text-secondary-foreground',
        destructive:
          'bg-destructive border-transparent text-destructive-foreground',
        outline: 'text-foreground border-border',
      },
      size: {
        default: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
  selector: '[smtBadge]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtBadgeDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _variant = signal<BadgeVariants['variant']>('default');
  @Input()
  set variant(variant: BadgeVariants['variant']) {
    this._variant.set(variant);
  }

  private readonly _size = signal<BadgeVariants['size']>('default');
  @Input()
  set size(size: BadgeVariants['size']) {
    this._size.set(size);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        badgeVariants({
          variant: this._variant(),
          size: this._size(),
        }),
        this.overrideClass()
      )
    )
  );
}
