/* eslint-disable prettier/prettier */
import { BookModel } from '../models/book.model';
import { AuthorModel } from '../models/author.model';
import { LikeModel } from '../models/like.model';
import { CommentModel } from '../models/comment.model';
import { CommentInput } from '@/interfaces/commentInput.interface';
import { BookInput } from '@/interfaces/bookInput.interface';

import { AuthorService } from './author.service';
import { bookTransformer } from '../transformers/bookTransformer';
import { BookRegistrationValidator } from '@/validators/bookRegistrationValidator';
import { CommentValidator } from '@/validators/commentValidator';

export class BookService {
  async register(input: BookInput) {
    const validator = new BookRegistrationValidator(input);
    await validator.validate();

    return this.createBook(input);
  }

  private async createBook(input: BookInput) {
    const date = input.date ? new Date(input.date) : undefined;
    const pages = input.pages ? Number(input.pages) : undefined;

    let authorId = (await this.takeRelatedAuthorId(input.author))?.id;

    if (!authorId) {
      const authorService = new AuthorService();
      authorId = (await authorService.getOrCreateAuthor(input.author)).id;
    }

    const book = await BookModel.query().insert({
      title: input.title,
      author: authorId,
      genre: input.genre,
      pages: pages,
      date: date,
      description: input.description,
    });

    return book;
  }

  private takeRelatedAuthorId(name: string) {
    return AuthorModel.query().where({ name }).first();
  }

  remove(id: number) {
    return BookModel.query().deleteById(id);
  }

  fetchById(id: number) {
    return BookModel.query().select(id).first();
  }

  async fetchWithAuthorById(id: number) {
    const book = await BookModel.query()
      .where({ id })
      .first()
      .withGraphFetched('authorInfo');

    return bookTransformer.transformWithAuthor(book);
  }

  async fetchAll(genre?: number, filter?: string) {
    let books: BookModel[];

    if (genre !== undefined && filter !== undefined) {
      books = await BookModel.query()
        .where({ genre })
        .andWhere('title', 'ILIKE', `%${filter}%`)
        .withGraphFetched('authorInfo');
    }
    else if (filter !== undefined) {
      books = await BookModel.query()
        .where('title', 'ILIKE', `%${filter}%`)
        .withGraphFetched('authorInfo');
    }
    else if (genre !== undefined) {
      books = await BookModel.query()
        .where({ genre })
        .withGraphFetched('authorInfo');
    }
    else {
      books = await BookModel.query()
        .withGraphFetched('authorInfo');
    }

    return books.map(book => bookTransformer.transformWithAuthor(book));
  }

  async fetchLikedBooks(id: number, genre?: number, filter?: string) {
    let likes: LikeModel[];
    if (genre !== undefined && filter !== undefined) {
      likes = await LikeModel.query()
        .where('user_id', id)
        .withGraphFetched('books')
        .modifyGraph('books', builder => {
          builder
            .where({ genre })
            .andWhere('title', 'ILIKE', `%${filter}%`);
        });
    }
    else if (filter !== undefined) {
      likes = await LikeModel.query()
        .where('user_id', id)
        .withGraphFetched('book')
        .modifyGraph('book', builder => {
          builder.where('title', 'ILIKE', `%${filter}%`);
        });
    }
    else if (genre !== undefined) {
      console.log('asd');
      likes = await LikeModel.query()
        .where('user_id', id)
        .withGraphFetched('book')
        .modifyGraph('book', builder => {
          builder.where({ genre });
        });
    }
    else {
      likes = await LikeModel.query()
        .where('user_id', id)
        .withGraphFetched('books');
    }
    return likes.map(like => bookTransformer.transformLikedBooksWithAuthor(like))
  }

  fetchByTitle(title: string) {
    return BookModel.query().select().where({ title }).first();
  }

  fetchByAuthor(author: string) {
    return BookModel.query().select().where({ author });
  }

  fetchByGenre(genre: string) {
    return BookModel.query().select().where({ genre });
  }

  listBooks(pageNumber: number, pageSize: number, filter?: string) {
    return filter ?
      BookModel.query()
        .where('title', 'ILIKE', `%${filter}%`)
        .orderBy('id')
        .page(pageNumber, pageSize) :
      BookModel.query()
        .page(pageNumber, pageSize);
  }

  addComment(input: CommentInput) {
    const validator = new CommentValidator(input);
    validator.validate();

    return this.createComment(input);;
  }

  private createComment(input: CommentInput) {
    return CommentModel.query().insert({
      book_id: Number(input.bookId),
      user_id: Number(input.userId),
      comment: input.text
    });
  }

  addLike(bookId: number, userId: number) {
    return LikeModel.query().insert({ book_id: bookId, user_id: userId });
  }

  fetchComments(bookId: number) {
    return BookModel
      .relatedQuery('comments')
      .for(bookId);
  }

  fetchAuthor(bookId: number) {
    return BookModel
      .relatedQuery('authorInfo')
      .for(bookId)
      .first();
  }

  fetchLikes(bookId: number) {
    return BookModel
      .relatedQuery('likes')
      .for(bookId);
  }
}
