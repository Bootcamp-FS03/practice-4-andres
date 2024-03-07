import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommentService } from './../../../../core/services/comment/comment.service';
import { PostService } from './../../../../core/services/post/post.service';
import { Post } from '../../../../core/models/post.model';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'fs-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass',
})
export class PostComponent {
  readonly loggedInProfile = this.profileService.profile;
  @Input({ required: true }) post!: Post;
  viewComments: boolean = false;
  loggerService: any;

  constructor(
    public dialog: MatDialog,
    public readonly postService: PostService,
    public readonly profileService: ProfileService,
    public readonly commentService: CommentService
  ) {}

  handleComments() {
    this.commentService.getComments(this.post._id).subscribe({
      next: () => {
        this.viewComments = !this.viewComments;
      },
      error: error => {
        this.loggerService.handleError(`Get comments failed: ${error.message}`);
        console.error('Error getting comments', error);
      },
    });
  }

  handleEdit(post: Post) {
    this.dialog.open(PostFormComponent, { data: { title: 'Edit ', profile: this.loggedInProfile, post: post } });
  }

  handleDelete(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.postService.getPosts().subscribe();
        this.loggerService.handleSuccess('Post deleted');
      },
      error: error => {
        this.loggerService.handleError(`Delete post failed: ${error.message}`);
        console.error('Error deleting post', error);
      },
    });
  }
}
