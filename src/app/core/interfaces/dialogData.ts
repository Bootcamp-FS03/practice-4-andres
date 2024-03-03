import { Post } from './../models/post.model';
import { Profile } from '../models/profile.model';

export interface DialogData {
  title: string;
  profile: Profile;
  post?: Post;
}
