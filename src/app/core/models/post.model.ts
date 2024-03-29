import { Author } from './author.model';

export interface Post {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}
export interface PostForm extends Pick<Post, 'text' | 'author'> {}
