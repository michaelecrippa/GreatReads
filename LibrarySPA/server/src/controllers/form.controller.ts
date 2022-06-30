import { NextFunction, Request, Response } from 'express';
import { FormService } from '@/services/form.service';

class FormController {
  public formService = new FormService();

  public nations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const nations = await this.formService.fetchNations();

      if (!nations) {
        res.status(400).json({ message: 'No nations found!' });
        return;
      }

      res.json({ data: nations });
    } catch (error) {
      next(error);
    }
  };

  public genres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genres = await this.formService.fetchGenres();

      if (!genres) {
        res.status(400).json({ message: 'No nations found!' });
        return;
      }

      res.json({ data: genres });
    } catch (error) {
      next(error);
    }
  };
}

export default FormController;
