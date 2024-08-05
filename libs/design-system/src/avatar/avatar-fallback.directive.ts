import { computed, Directive, input } from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Directive({
  selector: '[smtAvatarFallback]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAvatarFallbackDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        'flex h-full w-full items-center justify-center rounded-full',
        this.overrideClass()
      )
    )
  );
}
