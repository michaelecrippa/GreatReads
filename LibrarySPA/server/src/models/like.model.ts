import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BookModel } from './book.model';

export class LikeModel extends BaseModel {
  static tableName = 'likes';

  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      join: {
        from: 'likes.userId',
        to: 'users.id',
      },
      modelClass: 'user',
    },
    books: {
      relation: Model.HasManyRelation,
      join: {
        from: 'likes.bookId',
        to: 'books.id',
      },
      modelClass: 'book',
    },
  };

  id!: number;
  bookId!: number;
  userId!: number;

  books?: BookModel[];
}
