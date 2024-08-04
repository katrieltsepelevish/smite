import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { SmtTooltipContentComponent } from './tooltip-content.component';

export type TooltipPosition = 'left' | 'right' | 'above' | 'below';

@Component({
  selector: 'smt-tooltip',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class SmtTooltipComponent implements OnInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private _overlayRef: OverlayRef | null = null;
  private _portal?: ComponentPortal<SmtTooltipContentComponent>;
  private _showTooltip = signal<boolean>(false);
  private _tooltipInstance: SmtTooltipContentComponent | null = null;

  private readonly _label = signal<string>('');
  @Input({ required: true })
  set label(label: string) {
    this._label.set(label);
  }

  private readonly _position = signal<TooltipPosition>('above');
  @Input()
  get position(): TooltipPosition {
    return this._position();
  }

  set position(position: TooltipPosition) {
    this._position.set(position);
  }

  private readonly _offset = signal<number>(5);
  @Input()
  set offset(offset: number) {
    this._offset.set(offset);
  }

  constructor() {
    effect(() => {
      if (this._overlayRef && this._portal) {
        if (this._showTooltip()) {
          const tooltipContent = this._overlayRef.attach(this._portal);
          this._tooltipInstance = tooltipContent.instance;
          if (this._tooltipInstance) {
            this._tooltipInstance.label = this._label();
          }
        } else {
          this._overlayRef.detach();
        }
      }
    });

    effect(() => {
      if (this._overlayRef && this._showTooltip()) {
        this._updateTooltipContentLabel();
        this._updateTooltipContentPosition();
      }
    });
  }

  ngOnInit(): void {
    this._portal = new ComponentPortal(SmtTooltipContentComponent);

    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions(this._getTooltipContentPosition()),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });
  }

  ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }

  @HostListener('mouseover')
  onMouseOver(): void {
    this._showTooltip.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this._showTooltip.set(false);
  }

  private _getTooltipContentPosition(): ConnectedPosition[] {
    const offset = this._offset();

    const positions: Record<TooltipPosition, ConnectedPosition[]> = {
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

  private _updateTooltipContentPosition(): void {
    if (!this._overlayRef || !this._overlayRef.hasAttached()) return;

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef);

    positionStrategy.withPositions(this._getTooltipContentPosition());
    this._overlayRef.updatePositionStrategy(positionStrategy);
  }

  private _updateTooltipContentLabel(): void {
    if (this._tooltipInstance) {
      this._tooltipInstance.label = this._label();
    }
  }
}
