import { LoggerService } from './../../../../core/services/logger/logger.service';
import { ProfileService } from './../../../../core/services/profile/profile.service';
import { profileResolver } from './../../../../core/resolvers/profile.resolver';
import { Author } from './../../../../core/models/author.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DialogData } from '../../../../core/interfaces/dialogData';
import { PostService } from '../../../../core/services/post/post.service';
import { PostForm } from '../../../../core/models/post.model';

@Component({
  selector: 'fs-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.sass',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class PostFormComponent {
  postForm!: FormGroup;
  title = this.data.title;
  post? = this.data.post;
  postText? = this.data.post?.text;
  loggedInProfile = this.profileService.profile() as Author;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PostFormComponent>,
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    private readonly loggerService: LoggerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.postForm = this.formBuilder.group({
      text: [
        this.data.post ? this.postText : '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
      ],
      author: [this.loggedInProfile._id],
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
    }
    if (this.postForm.valid && this.data.post) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }

  private createPost(): void {
    this.postService.createPost(this.postForm.value).subscribe({
      next: post => {
        this.dialogRef.close(post);
        this.postService.getPosts().subscribe();
        this.loggerService.handleSuccess('Post created');
      },
      error: error => {
        this.loggerService.handleError(`Create post failed: ${error.message}`);
        console.error('Error creating post', error);
      },
    });
  }

  private updatePost(): void {
    this.postService.updatePost(this.post!._id, this.postForm.value).subscribe({
      next: post => {
        this.dialogRef.close(post);
        this.postService.getPosts().subscribe();
        this.loggerService.handleSuccess('Post updated');
      },
      error: error => {
        this.loggerService.handleError(`Update post failed: ${error.message}`);
        console.error('Error updating post', error);
      },
    });
  }
}
