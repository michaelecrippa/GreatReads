import { BookModel } from '../models/book.model';
import { LikeModel } from '../models/like.model';

class BookTransformer {
  transformWithAuthor(book: BookModel) {
    return {
      id: book.id,
      title: book.title,
      author: (book.authorInfo && book.authorInfo[0].name) || 'unknown',
      genre: book.genre,
      pages: book.pages,
      description: book.description,
      date: String(book.date).slice(0, 15),
    };
  }
  transformLikedBooksWithAuthor(like: LikeModel) {
    if (!like.books || like.books.length === 0) {
      return undefined;
    }
    return {
      id: like.books[0].id || 0,
      title: like.books[0].title,
      author: (like.books[0].authorInfo && like.books[0].authorInfo[0].name) || 'unknown',
      genre: like.books[0].genre || undefined,
      pages: like.books[0].pages || undefined,
      description: like.books[0].description || undefined,
      date: String(like.books[0].date).slice(0, 15) || undefined,
    };
  }
}

export const bookTransformer = new BookTransformer();
