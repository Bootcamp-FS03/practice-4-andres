import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/post.model';
import { PostService } from '../../../core/services/post/post.service';

@Component({
  selector: 'fs-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass',
})
export class FeedComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(public readonly postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  postTrackByFn(index: number, post: Post): string {
    return post._id;
  }
}
