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
  loading: boolean = true;

  constructor(public readonly postService: PostService, public readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService
      .getPosts()
      .pipe(tap(() => (this.loading = false)))
      .subscribe();
  }
}
