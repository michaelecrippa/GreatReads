import { AuthorModel } from '../models/author.model';

export class AuthorService {
  async register(auth: { name: string; age?: number; born?: Date; died?: Date; nationality?: string }) {
    const author = await AuthorModel.query()
      .insert({
        name: auth.name,
        age: auth?.age,
        born: auth?.born,
        died: auth?.died,
        nationality: auth?.nationality,
      })
      .returning(['id', 'name']);

    return author;
  }

  async getOrCreateAuthor(name: string) {
    const author = await AuthorModel.query().select().where({ name }).first();

    if (author) {
      return author;
    } else {
      return this.register({ name });
    }
  }

  async fetchById(id: number) {
    return AuthorModel.query().select(id).first();
  }

  async fetchAll() {
    return AuthorModel.query();
  }

  //todo test option
  async listAuthors(page: number, pageSize: number, option?: string) {
    //validate option
    return AuthorModel.query()
      .orderBy(option || 'id')
      .page(page, pageSize);
  }
}
