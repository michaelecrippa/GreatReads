import { httpService } from './httpsService';
import { BookModel } from '../models/Book/bookModel.interface';
import { BookInput } from '../models/Book/bookInput.interface';

class BookService {
  async loadBooks(genre: string | undefined, filter: string, userId?: number): Promise<BookModel[]> {
    if (userId) {
      let url = `/books/allBooks/?id=${userId}&`;
      return await (genre ? this.loadBooksByPath(url, filter, genre) : this.loadBooksByPath(url, filter));
    } else {
      let url = '/books/allBooks/?';
      return await (genre ? this.loadBooksByPath(url, filter, genre) : this.loadBooksByPath(url, filter));
    }
  }

  async loadBook(id: string): Promise<BookModel | undefined> {
    const book = await httpService.get<BookModel>(`/books/singleBook/?id=${id}`);

    return book;
  }

  async createBook(input: BookInput) {
    await httpService.post<BookModel>('/books/', input);
  }

  private async loadBooksByPath(path: string, filter: string, genre?: string): Promise<BookModel[]> {
    if (filter.length > 0 && genre) {
      path = path.concat(`filter=${encodeURIComponent(filter)}&genre=${encodeURIComponent(genre)}`);
    }
    else if (filter.length > 0) {
      path = path.concat(`filter=${encodeURIComponent(filter)}`);
    }
    else if (genre) {
      path = path.concat(`genre=${encodeURIComponent(genre)}`);
    }
    const response = await httpService.get<BookModel[]>(path);

    return response;
  }
}

export const bookService = new BookService();