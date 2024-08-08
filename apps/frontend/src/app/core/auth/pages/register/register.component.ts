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

import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    SmtButtonDirective,
    SmtCardComponent,
    SmtFormFieldComponent,
    SmtInputDirective,
    SmtInputErrorComponent,
    SmtLabelDirective,
  ],
  providers: [provideIcons({ lucideGithub, lucideLoader })],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public readonly isLoading = signal<boolean>(false);
  public readonly submitted = signal<boolean>(false);

  private readonly _formBuilder = inject(FormBuilder);

  public readonly registerForm = this._formBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: PasswordValidator.mustMatch('password', 'confirmPassword') }
  );

  public get f() {
    return this.registerForm.controls;
  }

  public hasErrors(controlName: string): boolean {
    const control = this.registerForm.get(controlName);

    if (control) {
      return control?.errors !== null && this.submitted();
    }

    return false;
  }

  public hasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);

    if (control) {
      return control.hasError(errorType) && this.submitted();
    }

    return false;
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 3000);
  }
}
