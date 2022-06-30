import { Model } from 'objection';
import { BaseModel } from './base.model';

export class AuthorModel extends BaseModel {
  static tableName = 'authors';

  static relationMappings = {
    book: {
      relation: Model.HasManyRelation,
      join: {
        from: 'authors.id',
        to: 'books.author',
      },
      modelClass: 'like',
    },
  };

  id!: number;
  name!: string;
  nationality!: string | null;
  born!: Date | null;
  died!: Date | null;
  age!: number | null;
}
