import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  /**
   * If our validation fails, we return an object with a key for the error name and a value of true.
   * Otherwise, if the validation passes, we simply return null because there is no error.
   */
  static confirmPassword: ValidatorFn = (
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const isEqual = passwordControl.value === confirmPasswordControl.value;

    return !isEqual ? { passwordNoMatch: true } : null;
  };
}
