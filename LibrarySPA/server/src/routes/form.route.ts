import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import FormController from '@/controllers/form.controller';

class FormRoute implements Routes {
  public path = '/form';
  public router = Router();
  private formController = new FormController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/genres`, authMiddleware, this.formController.genres);
    this.router.get(`${this.path}/nations`, this.formController.nations);
  }
}

export default FormRoute;
