import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@NgModule({
  declarations: [HomeComponent, FeedComponent, LayoutComponent, PostComponent, PostFormComponent, AddPostComponent],
  imports: [
    CommonModule,
    RootRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
})
export class RootModule {}
