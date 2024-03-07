import { PostService } from './../../../../core/services/post/post.service';
import { Component, Input } from '@angular/core';
import { Post } from '../../../../core/models/post.model';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { PostFormComponent } from '../post-form/post-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'fs-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass',
})
export class PostComponent {
  readonly loggedInProfile = this.profileService.profile;
  @Input({ required: true }) post!: Post;
  viewComments: boolean = false;

  constructor(
    public dialog: MatDialog,
    public readonly postService: PostService,
    public readonly profileService: ProfileService
  ) {}
  ngOnInit(): void {
    console.log('post', this.post);
  }

  handleComments() {
    this.viewComments = !this.viewComments;
  }

  handleEdit(post: Post) {
    this.dialog.open(PostFormComponent, { data: { title: 'Edit ', profile: this.loggedInProfile, post: post } });
  }

  handleDelete(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.postService.getPosts().subscribe();
        console.log('post Deleted ');
      },
      error: error => console.error('Error deleting post', error),
    });
  }
}
