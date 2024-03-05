import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { profileResolver } from '../../core/resolvers/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [profileResolver],
    children: [{ path: '', component: FeedComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
