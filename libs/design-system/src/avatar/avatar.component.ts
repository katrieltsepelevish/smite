import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ContentChild,
  effect,
  Input,
  input,
  signal,
} from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

import { SmtAvatarImageDirective } from './avatar-image.directive';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-10 w-10',
        lg: 'h-14 w-14 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;

@Component({
  selector: 'smt-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (image?.canShow()) {
    <ng-content select="[smtAvatarImage]" />
    } @else {
    <ng-content select="[smtAvatarFallback]" />
    }
  `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAvatarComponent {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  @ContentChild(SmtAvatarImageDirective, { static: false })
  public image?: SmtAvatarImageDirective;

  private readonly _size = signal<AvatarVariants['size']>('md');
  @Input()
  set size(size: AvatarVariants['size']) {
    this._size.set(size);
  }

  constructor() {
    effect(() => {
      if (!this.image) {
        throw new Error('smt-avatar must contain a smtAvatarImage.');
      }
    });
  }

  private _getRandomGrayBackgroundColor(): string {
    const grayColors = [
      'bg-gray-100',
      'bg-gray-200',
      'bg-gray-300',
      'bg-gray-400',
      'bg-gray-500',
      'bg-gray-600',
      'bg-gray-700',
      'bg-gray-800',
      'bg-gray-900',
    ];
    const randomIndex = Math.floor(Math.random() * grayColors.length);
    return grayColors[randomIndex];
  }

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        avatarVariants({ size: this._size() }),
        this._getRandomGrayBackgroundColor(),
        this.overrideClass()
      )
    )
  );
}
