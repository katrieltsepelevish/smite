import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtFormFieldComponent,
  SmtInputDirective,
  SmtInputErrorComponent,
  SmtLabelDirective,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    SmtButtonDirective,
    SmtCardComponent,
    SmtFormFieldComponent,
    SmtLabelDirective,
    SmtInputDirective,
    SmtInputErrorComponent,
  ],
  providers: [provideIcons({ lucideGithub, lucideLoader })],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public readonly isLoading = signal<boolean>(false);
  public readonly submitted = signal<boolean>(false);

  private readonly _formBuilder = inject(FormBuilder);

  public readonly loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public get f() {
    return this.loginForm.controls;
  }

  public hasErrors(controlName: string): boolean {
    const control = this.loginForm.get(controlName);

    if (control) {
      return control?.errors !== null && this.submitted();
    }

    return false;
  }

  public hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);

    if (control) {
      return control.hasError(errorType) && this.submitted();
    }

    return false;
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }
}
