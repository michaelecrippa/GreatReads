import { Model } from 'objection';
import { BaseModel } from './base.model';
import { UserModel } from './users.model';
import { BookModel } from './book.model';

export class CommentModel extends BaseModel {
  static tableName = 'comments';

  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'comments.user_id',
        to: 'users.id',
      },
      modelClass: UserModel,
    },
    books: {
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'comments.book_id',
        to: 'books.id',
      },
      modelClass: BookModel,
    },
  };

  id!: number;
  book_id!: number;
  user_id!: number;
  comment!: string;

  book?: BookModel;
  user?: UserModel;
}
