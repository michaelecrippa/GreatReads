import { Model } from 'objection';
import { BaseModel } from './base.model';
import { AuthorModel } from './author.model';
import { LikeModel } from './like.model';
import { CommentModel } from './comment.model';

export class BookModel extends BaseModel {
  static tableName = 'books';

  static relationMappings = {
    likes: {
      relation: Model.HasManyRelation,
      join: {
        from: 'books.id',
        to: 'likes.bookId',
      },
      modelClass: 'like',
    },
    comments: {
      relation: Model.HasManyRelation,
      join: {
        from: 'books.id',
        to: 'comments.bookId',
      },
      modelClass: 'comment',
    },
    authorInfo: {
      relation: Model.HasManyRelation,
      join: {
        from: 'books.author',
        to: 'authors.id',
      },
      modelClass: 'author',
    },
  };

  id!: number;
  title!: string;
  author!: number;
  genre!: string | null;
  pages!: number | null;
  description!: string | null;
  date!: Date | null;

  authorInfo?: AuthorModel[];
  likes?: LikeModel[];
  comments?: CommentModel[];
}
