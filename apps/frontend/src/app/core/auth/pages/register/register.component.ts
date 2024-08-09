import { Component, inject, signal, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';

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
export class RegisterComponent implements OnInit {
  public readonly submitted = signal<boolean>(false);

  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string>;

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

  ngOnInit(): void {
    this.isLoading$ = this._authService.isLoading$;
    this.error$ = this._authService.error$;
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

    this._authService
      .register({
        firstName: this.registerForm.controls.firstName.value as string,
        lastName: this.registerForm.controls.lastName.value as string,
        email: this.registerForm.controls.email.value as string,
        password: this.registerForm.controls.password.value as string,
      })
      .subscribe(() => {
        this._router.navigateByUrl('/');
      });
  }
}
