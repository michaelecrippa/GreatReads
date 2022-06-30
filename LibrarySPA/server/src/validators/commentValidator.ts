import { CommentInput } from '@/interfaces/commentInput.interface';
import { ValidationError } from '@/exceptions/ValidationException';

export class CommentValidator {
  constructor(private comment: CommentInput) {}

  async validate() {
    if (this.comment.text.length > 255) {
      throw new ValidationError('comment', 'Comment must be shorter than 256 characters!');
    }
  }
}
