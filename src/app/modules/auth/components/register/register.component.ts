import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoggerService } from './../../../../core/services/logger/logger.service';
import { AuthService } from './../../../../core/services/auth/auth.service';
import { matchValidator } from '../../../../core/validators/matchValidator';

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private loggerService: LoggerService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#%$£&\.*])\S{4,20})$/),
        ],
      ],
      confirmPass: ['', [Validators.required, matchValidator('pass')]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { username, pass: password } = this.registerForm.value;
      this.authService.register({ username, password }).subscribe({
        next: () => {
          this.loggerService.handleSuccess('User registered successfully');
          this.router.navigate(['/login']);
        },
      });
    }
  }

  getErrorMessage(formField: string): string {
    if (this.registerForm?.get(formField)?.hasError('required')) {
      return `You must enter a value.`;
    }
    if (this.registerForm?.get(formField)?.hasError('minlength')) {
      return `The ${formField} must be at least 4 characters`;
    }
    if (this.registerForm?.get(formField)?.hasError('maxlength')) {
      return `The ${formField} cannot be more than 20 characters`;
    }
    if (this.registerForm?.get(formField)?.hasError('pattern')) {
      return `The ${formField} must have at least one uppercase, one lowercase, one number, and at least one of these characters: @ # % $ £ & \ * `;
    }
    if (this.registerForm?.get(formField)?.hasError('match')) {
      return `The passwords do not match`;
    }
    return '';
  }
}
