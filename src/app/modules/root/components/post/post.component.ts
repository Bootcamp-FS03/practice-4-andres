import { Component, Input } from '@angular/core';
import { Post } from '../../../../core/models/post.model';
import { ProfileService } from '../../../../core/services/profile/profile.service';

@Component({
  selector: 'fs-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass',
})
export class PostComponent {
  @Input() post!: Post;

  constructor(public readonly profileService: ProfileService) {}
}
