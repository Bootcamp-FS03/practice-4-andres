import { Author } from './author.model';
import { Post } from './post.model';

export interface Comment {
  _id: string;
  text: string;
  author: Author;
  post: Post;
  createdAt: string;
  updatedAt: string;
}
