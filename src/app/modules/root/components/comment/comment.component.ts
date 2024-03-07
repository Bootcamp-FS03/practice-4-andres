import { Component, Input } from '@angular/core';

import { Comment } from '../../../../core/models/comment.model';

@Component({
  selector: 'fs-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass',
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;

  ngOnInit(): void {
    console.log('CommentComponent initialized', this.comment);
  }
}
