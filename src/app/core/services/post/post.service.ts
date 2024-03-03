import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, tap } from 'rxjs';

import { Post } from '../../models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly POSTS_PATH = environment.api.post;

  private postsUpdatedSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}${this.POSTS_PATH}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http
      .post<Post>(`${this.BASE_URL}${this.POSTS_PATH}`, post)
      .pipe(tap(() => this.postsUpdatedSubject.next()));
  }

  updatePost(post: Post): Observable<Post> {
    return this.http
      .put<Post>(`${this.BASE_URL}${this.POSTS_PATH}/${post._id}`, post)
      .pipe(tap(() => this.postsUpdatedSubject.next()));
  }

  deletePost(postId: string): Observable<Post> {
    return this.http
      .delete<Post>(`${this.BASE_URL}${this.POSTS_PATH}/${postId}`)
      .pipe(tap(() => this.postsUpdatedSubject.next()));
  }

  postsUpdated() {
    return this.postsUpdatedSubject.asObservable();
  }
}
