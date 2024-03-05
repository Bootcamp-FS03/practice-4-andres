import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, tap, map } from 'rxjs';

import { Post, PostForm } from '../../models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly POSTS_PATH = environment.api.post;

  private _posts = signal<Post[]>([]);
  readonly posts = this._posts.asReadonly();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}${this.POSTS_PATH}`).pipe(
      tap(posts => this._posts.set(posts)),
      map(posts => posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}${this.POSTS_PATH}`, post);
  }

  updatePost(postId: string, postForm: PostForm): Observable<Post> {
    return this.http.patch<Post>(`${this.BASE_URL}${this.POSTS_PATH}/${postId}`, postForm);
  }

  deletePost(postId: string): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}${this.POSTS_PATH}/${postId}`);
  }
}
