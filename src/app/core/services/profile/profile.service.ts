import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { Profile } from '../../models/profile.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly PROFILE_PATH = environment.api.profile;
  private _profile = signal<Profile | null>(null);
  readonly profile = this._profile.asReadonly();

  constructor(private http: HttpClient) {}

  getProfile(useCache: boolean = true): Observable<Profile> {
    if (useCache && this.profile) return of(this.profile() as Profile);

    return this.http.get<Profile>(`${this.BASE_URL}${this.PROFILE_PATH}`).pipe(
      tap(profile => {
        this._profile.set(profile);
      })
    );
  }
}
