import { Directive, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cardSubtitleVariants = cva('text-sm text-muted-foreground', {
  variants: {},
  defaultVariants: {},
});

export type CardSubtitleVariants = VariantProps<typeof cardSubtitleVariants>;

@Directive({
  selector: '[smtCardSubtitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtCardSubtitleDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(clsx(cardSubtitleVariants(), this.overrideClass()))
  );
}
