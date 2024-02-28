import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Profile } from '../../models/profile.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly PROFILE_PATH = environment.api.profile;
  private _profile$ = new BehaviorSubject<Profile | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(() => {
      this.setProfile(null);
    });
  }

  get profile$() {
    return this._profile$.asObservable();
  }

  get profile() {
    return this._profile$.value;
  }
  setProfile(profile: Profile | null): void {
    this._profile$.next(profile);
  }

  getProfile(useCache: boolean = true): Observable<Profile> {
    if (useCache && this.profile) return this.profile$ as Observable<Profile>;

    return this.http.get<Profile>(`${this.BASE_URL}${this.PROFILE_PATH}`).pipe(
      tap(profile => {
        if (!this.profile) {
          this.setProfile(profile);
        }
      })
    );
  }
}
