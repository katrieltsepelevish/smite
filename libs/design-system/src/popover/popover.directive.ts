import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

export type PopoverAlign = 'start' | 'center' | 'end';

@Directive({
  selector: '[smtPopoverTrigger]',
  standalone: true,
})
export class SmtPopoverTriggerDirective implements OnInit, OnDestroy {
  private readonly _align = signal<PopoverAlign>('start');
  @Input()
  set align(value: PopoverAlign) {
    this._align.set(value);
  }

  private readonly _offset = signal<number>(5);
  @Input()
  set offset(offset: number) {
    this._offset.set(offset);
  }

  @Input()
  smtPopoverTrigger!: TemplateRef<object>;

  private _unsubscribe$ = new Subject<void>();
  private _overlayRef!: OverlayRef;

  private readonly _elementRef = inject(ElementRef);
  private readonly _overlay = inject(Overlay);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions([
          {
            originX: this._align(),
            originY: 'bottom',
            overlayX: this._align(),
            overlayY: 'top',
            offsetY: this._offset(),
          },
          {
            originX: this._align(),
            originY: 'top',
            overlayX: this._align(),
            overlayY: 'bottom',
            offsetY: this._offset(),
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
    });

    this._overlayRef
      .backdropClick()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this._detachPopoverCotnentOverlayFromTrigger();
      });
  }

  ngOnDestroy(): void {
    this._detachPopoverCotnentOverlayFromTrigger();
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private _attachPopoverContentOverlayToTrigger(): void {
    if (!this._overlayRef.hasAttached()) {
      const popoverTriggerSelectorPortal = new TemplatePortal(
        this.smtPopoverTrigger,
        this._viewContainerRef
      );

      this._overlayRef.attach(popoverTriggerSelectorPortal);
    }
  }

  private _detachPopoverCotnentOverlayFromTrigger(): void {
    if (this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }

  @HostListener('click')
  onClick(): void {
    this._attachPopoverContentOverlayToTrigger();
  }
}
