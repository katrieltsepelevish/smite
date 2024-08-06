import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { RouterLink } from '@angular/router';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { CommonModule } from '@angular/common';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    HlmFormFieldModule,
    NgIconComponent,
    HlmInputDirective,
    FormsModule,
    HlmLabelDirective,
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
  validationMessages = {
    firstName: [
      { type: 'required', message: 'First Name is required.' },
      {
        type: 'minlength',
        message: 'First Name must be at least 2 characters long.',
      },
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required.' },
      {
        type: 'minlength',
        message: 'Last Name must be at least 2 characters long.',
      },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      {
        type: 'email',
        message: 'Email must be a valid email address.',
      },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm Password is required.' },
      {
        type: 'minlength',
        message: 'Confirm Password must be at least 6 characters long.',
      },
    ],
    matchingPasswords: [
      { type: 'passwordNoMatch', message: 'Passwords must match.' },
    ],
  };

  public registerForm = new FormGroup(
    {
      firstName: new FormControl<string>(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      lastName: new FormControl<string>(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      email: new FormControl<string>(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl<string>(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      confirmPassword: new FormControl<string>(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    },
    { validators: PasswordValidator.confirmPassword }
  );

  // this._formBuilder.group(
  //   {
  //     firstName: ['', [Validators.required, Validators.minLength(2)]],
  //     lastName: ['', [Validators.required, Validators.minLength(2)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  //   },
  //   { validator: equalsValidator(password, confirmPassword) }
  // );

  onSubmit() {
    if (this.registerForm.invalid) return;
  }

  // isLoading = signal(false);

  // send() {
  //   this.isLoading.set(true);
  //   setTimeout(() => this.isLoading.set(false), 3000);
  // }
}
