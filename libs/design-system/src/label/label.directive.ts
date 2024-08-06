import {
  computed,
  Directive,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const labelVariants = cva(
  'text-sm font-medium leading-none [&>[smtInput]]:my-1 [&:has([smtInput]:disabled)]:cursor-not-allowed [&:has([smtInput]:disabled)]:opacity-70 [&.ng-invalid.ng-touched]:text-destructive',
  {
    variants: {
      error: {
        auto: '[&:has([smtInput].ng-invalid.ng-touched)]:text-destructive',
        true: 'text-destructive',
        false: '',
      },
      disabled: {
        auto: '[&:has([smtInput]:disabled)]:opacity-70',
        true: 'opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      error: 'auto',
      disabled: 'auto',
    },
  }
);

export type LabelVariants = VariantProps<typeof labelVariants>;

@Directive({
  selector: 'label[smtLabel]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    '[class.ng-invalid]': 'this._ngControl?.invalid || null',
    '[class.ng-dirty]': 'this._ngControl?.dirty || null',
    '[class.ng-valid]': 'this._ngControl?.valid || null',
    '[class.ng-touched]': 'this._ngControl?.touched || null',
  },
})
export class SmtLabelDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected readonly _ngControl = inject(NgControl, { optional: true });

  private readonly _error = signal<LabelVariants['error']>('auto');
  @Input()
  set error(error: LabelVariants['error']) {
    this._error.set(error);
  }

  private readonly _disabled = signal<LabelVariants['disabled']>('auto');
  @Input()
  set disabled(disabled: LabelVariants['disabled']) {
    this._disabled.set(disabled);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        labelVariants({ error: this._error(), disabled: this._disabled() }),
        this.overrideClass()
      )
    )
  );
}
