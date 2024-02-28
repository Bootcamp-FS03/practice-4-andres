import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { LoggerService } from '../../../../core/services/logger/logger.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loggerService: LoggerService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#%$£&\.*])\S{4,20})$/),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: data => {
          this.router.navigate(['/home']);
          this.loggerService.handleSuccess('Login successful');
        },
      });
    }
  }

  getErrorMessage(formField: string): string {
    if (this.loginForm?.get(formField)?.hasError('required')) {
      return `You must enter a value.`;
    }
    if (this.loginForm?.get(formField)?.hasError('minlength')) {
      return `The ${formField} must be at least 4 characters`;
    }
    if (this.loginForm?.get(formField)?.hasError('maxlength')) {
      return `The ${formField} cannot be more than 20 characters`;
    }
    if (this.loginForm?.get(formField)?.hasError('pattern')) {
      return `The ${formField} must have at least one uppercase, one lowercase, one number, and at least one of these characters: @ # % $ £ & \ * `;
    }
    return '';
  }
}
