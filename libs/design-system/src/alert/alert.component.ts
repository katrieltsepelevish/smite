import { Component, Input, computed, input, signal } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const alertVariants = cva(
  'flex flex-col text-xs gap-1 relative w-full rounded-lg border border-border p-4 [&>[smtAlertIcon]]:absolute [&>[smtAlertIcon]]:text-foreground [&>[smtAlertIcon]]:left-4 [&>[smtAlertIcon]]:top-4 [&>[smtAlertIcon]+div]:translate-y-[-3px] [&>[smtAlertIcon]~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        negative:
          'text-destructive border-destructive/50 dark:border-destructive [&>[smtAlertIcon]]:text-destructive text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;

@Component({
  selector: 'smt-alert',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAlertComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _variant = signal<AlertVariants['variant']>('default');
  @Input()
  set variant(variant: AlertVariants['variant']) {
    this._variant.set(variant);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(alertVariants({ variant: this._variant() }), this.overrideClass())
    )
  );
}
