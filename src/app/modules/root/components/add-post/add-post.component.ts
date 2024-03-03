import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ProfileService } from '../../../../core/services/profile/profile.service';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'fs-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.sass',
})
export class AddPostComponent {
  readonly loggedInProfile = this.profileService.profile;

  constructor(public readonly profileService: ProfileService, public dialog: MatDialog) {
    this.loggedInProfile = this.profileService.profile;
  }

  openPostForm() {
    this.dialog.open(PostFormComponent, { data: { title: 'Create new post', profile: this.loggedInProfile } });
  }
}
