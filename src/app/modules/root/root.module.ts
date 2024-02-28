import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@NgModule({
  declarations: [HomeComponent, FeedComponent, LayoutComponent],
  imports: [CommonModule, RootRoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule],
})
export class RootModule {}
