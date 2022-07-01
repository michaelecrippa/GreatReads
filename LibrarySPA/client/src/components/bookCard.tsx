import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Container,
  CardContent,
  Link,
  Button, 
  Box
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Link as RouterLink } from 'react-router-dom';
import { GenreDTO } from '../models/Common/genres.model';
import './bookCard.css';
import { BookModel } from '../models/Book/bookModel.interface';

interface BookCardProps {
  book: BookModel;
  genres: GenreDTO[];
}

export function BookCard({ book, genres }: BookCardProps) {
  return (
    <Card className='book-card-root'>
      <CardHeader
        title={book?.title}
        subheader={book?.author}
      />
      <CardMedia className='book-card-media' />
      <CardContent className='content'>
        <Container className='content-start'>
          {book.genre ?
            <Typography variant="h6" color="textSecondary" aria-label="genre">
              Genre: {genres.find(genre => genre.id === Number(book.genre))?.name}
            </Typography> : undefined
          }
          {book.pages ?
            <Typography variant="h6" color="textSecondary" aria-label="pages">
              Pages: {book.pages}
            </Typography> : undefined
          }
          {book.date ?
            <Typography variant="h6" color="textSecondary" aria-label="date published">
              Date published: {book.date}
            </Typography> : undefined
          }
        </Container>
        {book?.description &&
          <Box style={{maxHeight: '50px', overflowY: 'hidden'}}>
            <Typography color="textSecondary" aria-label="book description">
              {book.description}
            </Typography>
          </Box>
        }
        <Link component={RouterLink} to={`/book/${book.id}`} underline="none" color="inherit">
          <Button className='explore-button' variant='contained' color='primary' aria-label="explore-more">
            <MoreHorizIcon className='margin-right' />
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
