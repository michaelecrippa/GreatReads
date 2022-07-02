import { BookModel } from '../models/book.model';
import { LikeModel } from '../models/like.model';

class BookTransformer {
  transformWithAuthor(book: BookModel) {
    return {
      id: book.id,
      title: book.title,
      author: (book.authorInfo && book.authorInfo.name) || 'unknown',
      genre: book.genre,
      pages: book.pages,
      description: book.description,
      date: String(book.date).slice(0, 15),
      pictureUri: book.picture_uri,
    };
  }
  transformLikedBooksWithAuthor(like: LikeModel) {
    if (!like.book) {
      return undefined;
    }
    return {
      id: like.book.id || 0,
      title: like.book.title,
      author: (like.book.authorInfo && like.book.authorInfo.name) || 'unknown',
      genre: like.book.genre || undefined,
      pages: like.book.pages || undefined,
      description: like.book.description || undefined,
      date: String(like.book.date).slice(0, 15) || undefined,
      pictureUri: like.book.picture_uri,
    };
  }
}

export const bookTransformer = new BookTransformer();
