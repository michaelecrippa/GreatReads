import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Container,
  CardContent,
  Link,
  Button
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Link as RouterLink } from 'react-router-dom';

export function BookCard({ book }: any) {
  return (
    <Card>
      <CardHeader
        title={book?.title}
        subheader={book?.author}
      />
      <CardMedia />
      <CardContent>
        <Container>
          {book.genre ?
            <Typography variant="h6" color="textSecondary" aria-label="genre">
              Genre: {book.genre}
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
          <Typography color="textSecondary" aria-label="book description">
            {book.description}
          </Typography>
        }
        <Link component={RouterLink} to={`/book/:id=${book.id}`} underline="none" color="inherit">
          <Button variant='contained' color='primary' aria-label="explore-more">
            <MoreHorizIcon />
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}