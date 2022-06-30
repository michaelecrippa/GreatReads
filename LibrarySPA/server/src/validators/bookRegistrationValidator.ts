import { BookInput } from '@/interfaces/bookInput.interface';
import { BookModel } from '../models/book.model';
import { ValidationError } from '@/exceptions/ValidationException';

export class BookRegistrationValidator {
  constructor(private book: BookInput) {}

  async validate() {
    this.validateInput();
    await this.validateTitleUniqueness();
  }
  private validateInput() {
    if (this.book.title.length > 255) {
      throw new ValidationError('title', 'Title must be shorter than 256 characters!');
    }

    if (this.book.author.length > 255) {
      throw new ValidationError('author', "Author's name must be shorter than 256 characters!");
    }

    if (this.book.genre && this.book.genre.length > 255) {
      throw new ValidationError('genre', 'Genre must be shorter than 256 characters!');
    }
  }

  private async validateTitleUniqueness() {
    const matchingUsername = await BookModel.query().select().where({ title: this.book.title }).first();

    if (matchingUsername) {
      throw new ValidationError('title', 'There is already a book with this title!');
    }
  }
}
