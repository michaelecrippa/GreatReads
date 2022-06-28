import { httpService } from './httpsService';
import { NationalityDTO } from '../models/nationality.model';

class FormService {
  async takeNationalities() {
    const response = await httpService.get<NationalityDTO[]>('/nations/');
    return response;
  }
}

export const formService = new FormService();