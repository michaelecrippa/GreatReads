import { Model, QueryContext, ModelOptions } from 'objection';

export class BaseModel extends Model {
  created_at?: Date;

  static get modelPaths() {
    return [__dirname];
  }

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);

    this.created_at = new Date();
  }

  async $beforeUpdate(opts: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(opts, queryContext);
    delete this.created_at;
  }
}
