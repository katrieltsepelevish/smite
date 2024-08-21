import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  input,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TinyColor } from '@ctrl/tinycolor';

@Component({
  selector: 'smt-gradient-profile',
  standalone: true,
  template: '',
  host: {
    '[class]': '_computedClass()',
  },
})
export class SmtGradientProfileComponent {
  private readonly _text = signal<string>('');
  @Input()
  set text(text: string) {
    this._text.set(text);
  }

  private readonly _label = signal<string>('');
  @Input()
  set label(label: string) {
    this._label.set(label);
  }

  private readonly _width = signal<number>(300);
  @Input()
  set width(width: number) {
    this._width.set(width);
  }

  private readonly _height = signal<number>(300);
  @Input()
  set height(height: number) {
    this._height.set(height);
  }

  public readonly overrideClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    twMerge(
      clsx(
        'inline-block rounded-full bg-cover bg-center',
        this.overrideClass(),
      ),
    ),
  );

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      this._updateProfile();
    });
  }

  private _generateHashFromString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return hash;
  }

  private _generateGradient(text: string) {
    const c1 = new TinyColor({
      h: this._generateHashFromString(text) % 360,
      s: 0.95,
      l: 0.5,
    });
    const second = c1.triad()[1].toHexString();

    return {
      fromColor: c1.toHexString(),
      toColor: second,
    };
  }

  private _createSvg(): string {
    const gradient = this._generateGradient(
      this._text() || Math.random().toString(),
    );

    const svgContent = `
      <svg width="${this._width()}" height="${this._height()}" viewBox="0 0 ${this._width()} ${this._height()}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${gradient.fromColor}" />
            <stop offset="100%" stop-color="${gradient.toColor}" />
          </linearGradient>
        </defs>
        <rect fill="url(#gradient)" x="0" y="0" width="${this._width()}" height="${this._height()}" />
        ${
          this._label()
            ? `
          <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="${(this._width() * 0.9) / this._label().length}px">
            ${this._label()}
          </text>
        `
            : ''
        }
      </svg>
    `;

    return svgContent;
  }

  private _updateProfile() {
    const svgContent = this._createSvg();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'backgroundImage',
      `url(${svgUrl})`,
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'backgroundSize',
      'cover',
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'width',
      `${this._width()}px`,
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'height',
      `${this._height()}px`,
    );
  }
}
