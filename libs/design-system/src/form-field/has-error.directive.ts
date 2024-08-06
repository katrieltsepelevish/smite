import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  OnInit,
  Host,
  ElementRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { SmtFormFieldComponent } from './form-field.component';

@Directive({
  selector: '[smtHasError]',
  standalone: true,
})
export class SmtHasErrorDirective implements OnInit {
  @Input('smtHasError')
  public errorType: string | null = null;

  private _elementRef = inject(ElementRef);

  private readonly _ngControl = inject(NgControl, { optional: true });
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _templateRef = inject(TemplateRef<object>);

  private readonly _hasError = computed(() => {
    const formField = this._elementRef.nativeElement.parentElement;

    if (formField && this.errorType) {
      const controlErrors = formField?.hasError()
        ? this._ngControl?.control?.errors
        : null;
      return controlErrors ? !!controlErrors[this.errorType] : false;
    }
    return false;
  });

  constructor() {
    effect(() => {
      const formField = this._elementRef.nativeElement.parentElement;

      if (formField) {
        this._updateInputErrorView();
      } else {
        throw new Error(
          'smtHasError directive must be used together with smt-form-field and smtInput'
        );
      }
    });
  }

  ngOnInit(): void {
    console.log(this._ngControl, this._elementRef);
  }

  private _updateInputErrorView(): void {
    this._viewContainerRef.clear();
    if (this._hasError() && this.errorType) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}
