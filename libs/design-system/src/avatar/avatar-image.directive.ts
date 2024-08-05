import {
  computed,
  Directive,
  HostListener,
  input,
  signal,
} from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Directive({
  selector: 'img[smtAvatarImage]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtAvatarImageDirective {
  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  private readonly _error = signal<boolean>(false);
  private readonly _loaded = signal<boolean>(false);

  @HostListener('error')
  onImageError(): void {
    this._error.set(true);
  }

  @HostListener('load')
  onImageLoaded(): void {
    this._loaded.set(true);
  }

  public readonly canShow = computed(() => this._loaded() && !this._error());

  protected _computedClass = computed(() =>
    twMerge(
      clsx('aspect-square object-cover h-full w-full', this.overrideClass())
    )
  );
}
