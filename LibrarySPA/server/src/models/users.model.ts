import { User } from '@/interfaces/users.interface';
import { Model } from 'objection';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel implements User {
  static tableName = 'users';

  static relationMappings = {
    like: {
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'likes.userId',
      },
      modelClass: 'like',
    },
    comment: {
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'comments.userId',
      },
      modelClass: 'comment',
    },
  };

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  nationality!: number | null;
  sex!: string | null;
  age!: number | null;
  token!: string | null;
}
