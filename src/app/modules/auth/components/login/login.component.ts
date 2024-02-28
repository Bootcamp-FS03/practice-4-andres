import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      //call to API
      console.log('Login form is valid');
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
