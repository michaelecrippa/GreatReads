import { NationModel } from '@/models/nations.model';
import { GenresModel } from '@/models/genres.model';

export class FormService {
  async fetchNations(): Promise<NationModel[]> {
    return NationModel.query();
  }

  async fetchGenres(): Promise<GenresModel[]> {
    return GenresModel.query();
  }
}
