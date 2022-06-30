import { Model } from 'objection';
import { BaseModel } from './base.model';

export class CommentModel extends BaseModel {
  static tableName = 'comments';

  static relationMappings = {
    user: {
      relation: Model.ManyToManyRelation,
      join: {
        from: 'users.id',
        through: {
          from: 'likes.user_id',
          to: 'likes.book_id',
        },
        to: 'books.id',
      },
      modelClass: 'user',
    },
    book: {
      relation: Model.ManyToManyRelation,
      join: {
        from: 'books.id',
        through: {
          from: 'likes.book_id',
          to: 'likes.user_id',
        },
        to: 'user.id',
      },
      modelClass: 'book',
    },
  };

  id!: number;
  bookId!: number;
  userId!: number;
  comment!: string;
}
