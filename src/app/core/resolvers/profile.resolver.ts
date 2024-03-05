import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Observable } from 'rxjs';

import { Profile } from '../models/profile.model';
import { ProfileService } from './../services/profile/profile.service';

export const profileResolver: ResolveFn<Observable<Profile>> = () => {
  const profileService = inject(ProfileService);
  return profileService.getProfile(false);
};
