import { httpService } from './httpsService';
import { NationalityDTO } from '../models/Common/nationality.model';
import { GenreDTO } from '../models/Common/genres.model';

//todo seed genres
// const genres: GenreDTO[] = [
//   { id: 1, name: 'Novel' },
//   { id: 2, name: 'Fantasy' },
//   { id: 3, name: 'History' },
//   { id: 4, name: 'Horror' },
//   { id: 5, name: 'Classic' },
//   { id: 6, name: 'Adventure' },
//   { id: 7, name: 'Comic' },
//   { id: 8, name: 'Thriller' },
//   { id: 9, name: 'Other' },
// ];

class FormService {
  async takeNationalities() {
    const response = await httpService.get<NationalityDTO[]>('/form/nations');
    return response;
  }

  async takeGenres() {
    const response = await httpService.get<GenreDTO[]>('/form/genres');
    return response;
  }
}

export const formService = new FormService();