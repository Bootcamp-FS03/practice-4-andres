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
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      //call to API
      console.log('Login form is valid');
    }
  }
  getErrorMessage(formField: string): string {
    return this.loginForm.get(formField)?.hasError('required')
      ? 'You must enter a value'
      : this.loginForm.get(formField)?.hasError('minlength')
      ? `The ${formField} must be at least 3 characters`
      : this.loginForm.get(formField)?.hasError('maxlength')
      ? `The ${formField} cannot be more than 20 characters`
      : '';
  }
}
