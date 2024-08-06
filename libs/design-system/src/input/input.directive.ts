import {
  computed,
  Directive,
  DoCheck,
  effect,
  inject,
  input,
  Input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
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
        auto: '[&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'text-destructive border-destructive focus-visible:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: 'input[smtInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtInputDirective implements DoCheck {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _error = signal<InputVariants['error']>('auto');
  @Input()
  set error(error: InputVariants['error']) {
    this._error.set(error);
  }

  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  set size(size: InputVariants['size']) {
    this._size.set(size);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        inputVariants({ error: this._error(), size: this._size() }),
        this.overrideClass()
      )
    )
  );

  protected readonly _ngControl = inject(NgControl, { optional: true });
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _parentFormGroup = inject(FormGroupDirective, {
    optional: true,
  });
  public readonly hasError = signal<boolean>(false);

  constructor() {
    effect(
      () => {
        if (this._ngControl) {
          const isInvalid = this._isInvalidInput(this._ngControl.control);
          this.hasError.set(isInvalid);
          this._error.set(isInvalid);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngDoCheck() {
    if (this._ngControl) {
      const currentErrorState = this._isInvalidInput(this._ngControl.control);
      if (this.hasError() !== currentErrorState) {
        this.hasError.set(currentErrorState);
        this._error.set(currentErrorState);
      }
    }
  }

  private _isInvalidInput(control: AbstractControl | null): boolean {
    return !!(
      control &&
      control.invalid &&
      (control.touched ||
        (this._parentFormGroup || this._parentForm)?.submitted)
    );
  }
}
