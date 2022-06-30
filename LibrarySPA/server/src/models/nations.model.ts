import { BaseModel } from './base.model';

export class NationModel extends BaseModel {
  static tableName = 'nations';

  id!: number;
  name!: string;
}
