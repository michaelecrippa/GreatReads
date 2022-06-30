import { Request, Response, NextFunction } from 'express';

import { BookService } from '@/services/books.service';
import { ValidationError } from '@/exceptions/ValidationException';

class BookController {
  public bookService = new BookService();

  public getBooks = async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
      const pageNumber = Number(request.query.pageNumber);
      const pageSize = Number(request.query.pageSize);
      const filter = typeof request.query?.filter === 'string' ? request.query.filter : undefined;

      if (!Number.isInteger(pageNumber) || !Number.isInteger(pageSize)) {
        response.status(400).json({ error: 'Parameters must be integers!' });
        return;
      }
      const books = await this.bookService.listBooks(pageNumber, pageSize, filter);

      response.json({ data: books });
    } catch (error) {
      nextFunction(error);
    }
  };

  public getBook = async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
      const id = Number(request.query.id);
      const book = await this.bookService.fetchWithAuthorById(id);

      response.json({ data: book });
    } catch (error) {
      nextFunction(error);
    }
  };

  public addBook = async (request: Request, response: Response) => {
    try {
      const bookData = request.body;

      if (!bookData || !(bookData.title && bookData.author)) {
        response.status(400).json({ error: 'Incomplete parameters, title and author are required to register a book!' });
        return;
      }

      const book = await this.bookService.register(bookData);
      response.json({ data: book });
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).send({ key: error.key, name: error.name, message: error.message });
        return;
      }
      response.json({ message: error.message });
    }
  };

  public getBookComments = async (request: Request, response: Response) => {
    try {
      const id = request.query.bookId ? Number(request.query.bookId) : undefined;

      if (!id) {
        response.status(400).json({ error: 'Incomplete parameters: book id is required!' });
        return;
      }
      const comments = await this.bookService.fetchComments(<number>id);

      response.json({ data: comments });
    } catch (error) {
      response.json({ message: error.message });
      return;
    }
  };

  public getBookAuthor = async (request: Request, response: Response) => {
    try {
      const id = request.query.bookId ? Number(request.query.bookId) : undefined;

      if (!id) {
        response.status(400).json({ error: 'Incomplete parameters: book id is required!' });
        return;
      }
      const author = await this.bookService.fetchAuthor(id);

      response.json({ data: author });
    } catch (error) {
      response.json({ message: error.message });
    }
  };

  public addComment = async (request: Request, response: Response) => {
    try {
      const commentData = request.body;

      if (!commentData || !commentData.bookId || !commentData.comment) {
        response.status(400).json({ error: 'Incomplete parameters: book id and comment required!' });
        return;
      }
      await this.bookService.addComment({ bookId: commentData.bookId, userId: response.locals.user.id, text: commentData.comment });
    } catch (error) {
      response.json({ message: error.message });
    }
  };

  public likeBook = async (request: Request, response: Response) => {
    try {
      const commentData = request.body;

      if (!commentData || !commentData.bookId) {
        response.status(400).json({ error: 'Incomplete parameters: book id !' });
        return;
      }
      await this.bookService.addLike(Number(commentData.bookId), Number(response.locals.user.id));
    } catch (error) {
      response.json({ message: error.message });
    }
  };

  public deleteBook = async (request: Request, response: Response) => {
    try {
      const id = request.query.bookId ? Number(request.query.bookId) : undefined;
      if (!id) {
        response.status(400).json({ error: 'Incomplete parameters: book id !' });
        return;
      }

      await this.bookService.remove(id);
    } catch (error) {
      response.json({ message: error.message });
    }
  };
}

export default BookController;
