import { BaseModel } from './base.model';

export class GenresModel extends BaseModel {
  static tableName = 'genres';

  id!: number;
  name!: string;
}
