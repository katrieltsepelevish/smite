import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
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

export type PopoverPosition = 'left' | 'right' | 'above' | 'below';

@Directive({
  selector: '[smtPopoverTrigger]',
  standalone: true,
})
export class SmtPopoverTriggerDirective implements OnInit, OnDestroy {
  private readonly _position = signal<PopoverPosition>('below');
  @Input()
  set position(value: PopoverPosition) {
    this._position.set(value);
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
        .withPositions(this._getPopoverPosition()),
      scrollStrategy: this._overlay.scrollStrategies.close(),
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

  private _getPopoverPosition(): ConnectedPosition[] {
    const offset = this._offset();

    const positions: Record<PopoverPosition, ConnectedPosition[]> = {
      above: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -offset,
        },
      ],
      below: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: offset,
        },
      ],
      left: [
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -offset,
        },
      ],
      right: [
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: offset,
        },
      ],
    };

    return positions[this._position()] ?? [];
  }

  private _attachPopoverContentOverlayToTrigger(): void {
    if (!this._overlayRef.hasAttached()) {
      const popoverTriggerSelectorPortal = new TemplatePortal(
        this.smtPopoverTrigger,
        this._viewContainerRef,
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
