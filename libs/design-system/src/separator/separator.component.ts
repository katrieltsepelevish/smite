import { Component, computed, input, Input, signal } from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type SeparatorOrientation = 'horizontal' | 'vertical';

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

  private readonly _orientation = signal<SeparatorOrientation>('horizontal');
  @Input()
  set orientation(orientation: SeparatorOrientation) {
    this._orientation.set(orientation);
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        'inline-flex shrink-0 border-0 bg-border',
        this._orientation() === 'horizontal'
          ? 'h-[1px] w-full'
          : 'h-full w-[1px]',
        this.overrideClass()
      )
    )
  );
}
