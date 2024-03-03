import { Component, OnInit } from '@angular/core';

import { Observable, Subscription, combineLatest, map, of, tap } from 'rxjs';

import { Post } from '../../../core/models/post.model';
import { PostService } from '../../../core/services/post/post.service';
import { Profile } from '../../../core/models/profile.model';
import { ProfileService } from '../../../core/services/profile/profile.service';

@Component({
  selector: 'fs-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass',
})
export class FeedComponent implements OnInit {
  private postsUpdatedSubscription: Subscription | undefined;

  posts$!: Observable<Post[]>;
  profile$!: Observable<Profile>;
  loading: boolean = true;
  constructor(public readonly postService: PostService, public readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.subscribeToPostsUpdatedEvent();
  }

  loadPosts() {
    combineLatest<[Post[], Profile]>([this.postService.getPosts(), this.profileService.getProfile()])
      .pipe(
        tap(() => (this.loading = false)),
        map(([posts]) => posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
      )
      .subscribe(posts => (this.posts$ = of(posts)));
  }

  ngOnDestroy(): void {
    this.unsubscribeFromPostsUpdatedEvent();
  }

  postTrackByFn(index: number, post: Post): string {
    return post._id;
  }

  subscribeToPostsUpdatedEvent(): void {
    this.postsUpdatedSubscription = this.postService.postsUpdated().subscribe(() => {
      this.loadPosts();
    });
  }

  unsubscribeFromPostsUpdatedEvent(): void {
    if (this.postsUpdatedSubscription) {
      this.postsUpdatedSubscription.unsubscribe();
    }
  }
}
