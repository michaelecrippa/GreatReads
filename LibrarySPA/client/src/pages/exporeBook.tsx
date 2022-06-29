import { 
  Card, 
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  IconButton,
  Typography
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { bookService } from '../services/bookService';
import { ComponentState } from '../models/Components/componentState.interface';
import { BookModel } from '../models/Book/bookModel.interface';

export function Book() {
  let [component, setComponentState] = useState<ComponentState<BookModel>>({ data: undefined, loading: true, error: undefined, availableEntities: [] });
  let { id } = useParams<{ id: string }>();
  id = id?.slice(4);

  const GetBook = async () => {
    try {
      if (!id) {
        throw new Error("Id was not provided!");
      }
      
      const book = await bookService.loadBook(id);

      setComponentState({ data: book, loading: false, error: undefined, availableEntities: []});
    } catch (exception) {
      setComponentState({ data: undefined, loading: false, error: exception, availableEntities: [] });
    }
  }
  useEffect(() => { GetBook(); }, [id])

  return (
    <Box>
      {component.data && <Card>
        <CardHeader
          title={component.data.title}
          subheader={component.data.author}
        />
        <CardMedia/>
        <CardContent>
          {component.data.genre && 
            <Typography variant="h6" color="textSecondary" aria-label="genre">
              Genre: {component.data.genre}
            </Typography>
          }
          {component.data.pages && 
            <Typography variant="h6" color="textSecondary" aria-label="pages">
              Pages: {component.data.pages}
            </Typography>
          }
          {component.data.date && 
            <Typography variant="h6" color="textSecondary" aria-label="date published">
              Date: {component.data.date}
            </Typography>
          }
          {component.data.description && 
            <Typography color="textSecondary" aria-label="book description">
            {component.data.description}
            </Typography>
          }
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorite">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <IosShareIcon />
          </IconButton>
          <IconButton
            //TODO add comments and button features
            onClick={() => { }}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>}
    </Box>
  );
}