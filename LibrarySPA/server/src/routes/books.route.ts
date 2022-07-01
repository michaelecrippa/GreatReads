import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import BookController from '@/controllers/books.controller';
import authMiddleware from '@middlewares/auth.middleware';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  private bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.bookController.getBooks);
    this.router.get(`${this.path}/book/`, authMiddleware, this.bookController.getBook);
    this.router.get(`${this.path}/liked/`, authMiddleware, this.bookController.getLikedBooks);
    this.router.post(`${this.path}/book/`, authMiddleware, this.bookController.addBook);
    this.router.delete(`${this.path}/book/`, authMiddleware, this.bookController.deleteBook);
    this.router.get(`${this.path}/comments/`, authMiddleware, this.bookController.getBookComments);
    this.router.get(`${this.path}/author/`, authMiddleware, this.bookController.getBookAuthor);
    this.router.post(`${this.path}/comment/`, authMiddleware, this.bookController.addComment);
    this.router.post(`${this.path}/like/`, authMiddleware, this.bookController.likeBook);
  }
}

export default BooksRoute;
