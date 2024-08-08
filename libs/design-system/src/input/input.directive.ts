import {
  computed,
  Directive,
  inject,
  input,
  Input,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const inputVariants = cva(
  'flex rounded-md border font-normal border-input bg-transparent text-sm ring-offset-background file:border-0 file:text-foreground file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
      error: {
        true: 'text-destructive border-destructive focus-visible:ring-destructive',
        false: '',
      },
      disabled: {
        true: 'opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
      disabled: false,
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: 'input[smtInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    '[class.ng-invalid]': 'this._ngControl?.invalid || null',
    '[class.ng-dirty]': 'this._ngControl?.dirty || null',
    '[class.ng-valid]': 'this._ngControl?.valid || null',
    '[class.ng-touched]': 'this._ngControl?.touched || null',
  },
})
export class SmtInputDirective {
  protected readonly _ngControl = inject(NgControl, { optional: true });

  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _error = signal<InputVariants['error']>(false);
  @Input()
  set error(error: InputVariants['error']) {
    this._error.set(error);
  }

  private readonly _disabled = signal<InputVariants['disabled']>(false);
  @Input()
  set disabled(disabled: InputVariants['disabled']) {
    this._disabled.set(disabled);
  }

  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  set size(size: InputVariants['size']) {
    this._size.set(size);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        inputVariants({
          error: this._error(),
          disabled: this._disabled(),
          size: this._size(),
        }),
        this.overrideClass()
      )
    )
  );
}
