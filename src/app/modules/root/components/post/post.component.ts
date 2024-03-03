import { PostService } from './../../../../core/services/post/post.service';
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

  constructor(public readonly profileService: ProfileService, private readonly postService: PostService) {}

  handleDelete(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        console.log('post Deleted ');
      },
      error: error => console.error('Error deleting post', error),
    });
  }
}
