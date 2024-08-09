import { Component, inject, OnInit, signal } from '@angular/core';
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
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

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
    SmtAlertComponent,
    SmtAlertIconDirective,
    SmtAlertTitleDirective,
    SmtAlertDescriptionDirective,
  ],
  providers: [provideIcons({ lucideGithub, lucideLoader, lucideShieldAlert })],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public readonly submitted = signal<boolean>(false);

  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string>;

  public readonly loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.isLoading$ = this._authService.isLoading$;
    this.error$ = this._authService.error$;
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

    this._authService
      .login({
        email: this.loginForm.controls.email.value as string,
        password: this.loginForm.controls.password.value as string,
      })
      .subscribe(() => {
        this._router.navigateByUrl('/');
      });
  }
}
