import { Component, computed, Input, input, signal } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cardFooterVariants = cva('flex p-6 pt-0', {
  variants: {
    direction: {
      row: 'flex-row items-center space-x-1.5',
      column: 'flex-col space-y-1.5',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;

@Component({
  selector: 'smt-card-footer',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardFooterComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _direction = signal<CardFooterVariants['direction']>('row');
  @Input()
  set variant(variant: CardFooterVariants['direction']) {
    this._direction.set(variant);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        cardFooterVariants({ direction: this._direction() }),
        this.overrideClass()
      )
    )
  );
}
