import { httpService } from './httpsService';
import { BookModel } from '../models/Book/bookModel.interface';
import { BookInput } from '../models/Book/bookInput.interface';

class BookService {
  async loadBooks(genre: number | undefined, filter: string, userId?: number): Promise<BookModel[]> {
    if (userId) {
      let url = `/books/liked/?id=${userId}&`;
      return await (genre ? this.loadBooksByPath(url, filter, genre) : this.loadBooksByPath(url, filter));
    } else {
      let url = '/books/?';
      return await (genre ? this.loadBooksByPath(url, filter, genre) : this.loadBooksByPath(url, filter));
    }
  }

  async loadBook(id: string): Promise<BookModel | undefined> {
    return await httpService.get<BookModel>(`/books/book/?id=${id}`);
  }

  async createBook(input: BookInput): Promise<BookModel> {
    return await httpService.post<BookModel>('/books/book', input);
  }

  private async loadBooksByPath(path: string, filter: string, genre?: number): Promise<BookModel[]> {
    if (filter.length > 0 && genre) {
      path = path.concat(`filter=${encodeURIComponent(filter)}&genre=${genre}`);
    }
    else if (filter.length > 0) {
      path = path.concat(`filter=${encodeURIComponent(filter)}`);
    }
    else if (genre) {
      path = path.concat(`genre=${genre}`);
    }
    const response = await httpService.get<BookModel[]>(path);

    return response;
  }
}

export const bookService = new BookService();