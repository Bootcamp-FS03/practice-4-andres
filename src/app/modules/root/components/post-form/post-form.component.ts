import { Author } from './../../../../core/models/author.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DialogData } from '../../../../core/interfaces/dialogData';
import { PostService } from '../../../../core/services/post/post.service';

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
  postText? = this.data.post?.text;
  profile = this.data.profile;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PostFormComponent>,
    private readonly postService: PostService,
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
      author: [this.data.post ? this.postText : this.profile?._id],
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
        console.log('post created');
      },
      error: error => {
        console.error('Error creating post', error);
      },
    });
  }

  private updatePost(): void {
    console.log('Update post');
  }
}
