import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { User } from '../../models/user.model';
import { Token } from '../../models/token.model';
import { LoggerService } from './../logger/logger.service';
import { environment } from '../../../../environments/environment';
import { ErrorResponse } from '../../models/error-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly LOGIN_PATH = environment.api.login;
  private readonly REGISTER_PATH = environment.api.signup;
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.BASE_URL}${this.LOGIN_PATH}`, user).pipe(
      tap(({ acces_token: token }) => {
        this._isLoggedIn$.next(true);
        this.saveToken(token);
      }),
      catchError(this.handleError<Token>('login'))
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  register(newUser: User): Observable<User> {
    console.log(newUser);
    return this.http
      .post<User>(`${this.BASE_URL}${this.REGISTER_PATH}`, newUser)
      .pipe(catchError(this.handleError<User>('Register')));
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!this.getToken();

    if (isLoggedIn && !this._isLoggedIn$.value) {
      this._isLoggedIn$.next(true);
    }

    return isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handleError<T>(operation = 'operation') {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      const errorInfo = errorResponse.error as ErrorResponse;
      const errorMessage = errorInfo.message || 'Unknown error ocurred';

      this.loggerService.handleError(`${operation} failed: ${errorMessage}`);
      return throwError(() => new Error(`${operation} failed: ${errorMessage}`));
    };
  }
}
