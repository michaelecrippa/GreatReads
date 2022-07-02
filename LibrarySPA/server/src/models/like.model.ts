import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BookModel } from './book.model';
import { UserModel } from './users.model';

export class LikeModel extends BaseModel {
  static tableName = 'likes';

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'likes.user_id',
        to: 'users.id',
      },
      modelClass: './user.model',
    },
    book: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'likes.book_id',
        to: 'books.id',
      },
      modelClass: './book.model',
    },
  };

  id!: number;
  book_id!: number;
  user_id!: number;

  book!: BookModel;
  user!: UserModel;
}
