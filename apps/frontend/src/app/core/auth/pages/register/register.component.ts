import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SmtAlertComponent,
  SmtAlertDescriptionDirective,
  SmtAlertIconDirective,
  SmtAlertTitleDirective,
  SmtButtonDirective,
  SmtCardComponent,
  SmtFormFieldComponent,
  SmtInputDirective,
  SmtInputErrorComponent,
  SmtLabelDirective,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideGithub,
  lucideLoader,
  lucideShieldAlert,
} from '@ng-icons/lucide';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PasswordValidator } from '../../validators/password.validator';
import { AuthService } from '../../auth.service';
import { finalize } from 'rxjs';

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
    SmtAlertComponent,
    SmtAlertIconDirective,
    SmtAlertTitleDirective,
    SmtAlertDescriptionDirective,
  ],
  providers: [provideIcons({ lucideGithub, lucideLoader, lucideShieldAlert })],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public readonly submitted = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);
  public readonly error = signal<string>('');

  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  public readonly registerForm = this._formBuilder.group(
    {
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: PasswordValidator.mustMatch('password', 'confirmPassword') },
  );

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
    this.error.set('');

    this._authService
      .register({
        firstname: this.registerForm.controls.firstname.value as string,
        lastname: this.registerForm.controls.lastname.value as string,
        email: this.registerForm.controls.email.value as string,
        password: this.registerForm.controls.password.value as string,
      })
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this._router.navigateByUrl('/');
        },
        error: ({ message }) => {
          this.error.set(message);
        },
      });
  }
}
