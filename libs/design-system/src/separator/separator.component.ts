import { Component, computed, input, Input, signal } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const separatorVariants = cva('inline-flex shrink-0 border-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;

@Component({
  selector: 'smt-separator',
  standalone: true,
  imports: [],
  template: ``,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtSeparatorComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _orientation =
    signal<SeparatorVariants['orientation']>('horizontal');
  @Input()
  set orientation(orientation: SeparatorVariants['orientation']) {
    this._orientation.set(orientation);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        separatorVariants({ orientation: this._orientation() }),
        this.overrideClass()
      )
    )
  );
}
