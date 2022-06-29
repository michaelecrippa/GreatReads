import { BookCard } from './bookCard';
import { BookListProps } from '../models/Components/bookListProps';

import { Container } from '@mui/material/';

export function BookList({ books }: BookListProps) {
  return (
    <Container>
      {books.map(book => <BookCard book={book} />)}
    </Container>
  );
}
