import { Component, computed, Input, input, signal } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cardHeaderVariants = cva('flex p-6', {
  variants: {
    direction: {
      row: 'flex-row items-center space-x-1.5',
      column: 'flex-col space-y-1.5',
    },
  },
  defaultVariants: {
    direction: 'column',
  },
});

export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;

@Component({
  selector: 'smt-card-header',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardHeaderComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _direction =
    signal<CardHeaderVariants['direction']>('column');
  @Input()
  set variant(variant: CardHeaderVariants['direction']) {
    this._direction.set(variant);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        cardHeaderVariants({ direction: this._direction() }),
        this.overrideClass()
      )
    )
  );
}
