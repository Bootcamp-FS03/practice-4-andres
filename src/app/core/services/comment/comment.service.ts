import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { environment } from '../../../../environments/environment';
import { tap, Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly COMMENTS_PATH = environment.api.comment;

  private _comments = signal<Comment[]>([]);
  readonly comments = this._comments.asReadonly();

  constructor(private httpClient: HttpClient) {}

  getComments(postId: string): Observable<Comment[]> {
    return this.httpClient
      .get<Comment[]>(`${this.BASE_URL}${this.COMMENTS_PATH}?postId=${postId}`)
      .pipe(tap(comments => this._comments.set(comments)));
  }
}
