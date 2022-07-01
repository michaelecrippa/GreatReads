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

import * as _ from 'lodash';

import './exploreBook.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { bookService } from '../services/bookService';
import { ComponentState } from '../models/Components/componentState.interface';
import { BookModel } from '../models/Book/bookModel.interface';
import { GenreDTO } from '../models/Common/genres.model';
import { formService } from '../services/formService';

export function Book() {
  let [component, setComponentState] = useState<ComponentState<GenreDTO, BookModel>>({
    data: undefined,
    loading: true,
    error: undefined,
    availableEntities: []
  });

  let { id } = useParams<{ id: string }>();
  const GetBook = async () => {
    try {
      if (!id) {
        throw new Error("Id was not provided!");
      }

      const book = await bookService.loadBook(id);
      const genres = await formService.takeGenres();

      setComponentState({ data: book, loading: false, error: undefined, availableEntities: genres });
    } catch (exception) {
      setComponentState({ data: undefined, loading: false, error: exception, availableEntities: [] });
    }
  }
  useEffect(() => { GetBook(); }, [id])

  return (
    <Box className='book-container'>
      {component.data &&
        <Card className='card-root'>
          <CardHeader
            title={component.data.title}
            subheader={component.data.author}
          />
          <Box className='media-container'>
            <CardMedia className='media' />
          </Box>
          <CardContent>
            {component.data.genre &&
              <Typography variant="h6" color="textSecondary" aria-label="genre">
                Genre: {component.availableEntities.find(genre => genre.id === Number(component?.data?.genre))?.name || 'unknown'}
              </Typography>
            }
            {component.data.pages &&
              <Typography variant="h6" color="textSecondary" aria-label="pages">
                Number of pages: {component.data.pages || 'unknown'}
              </Typography>
            }
            {component.data.date &&
              <Typography variant="h6" color="textSecondary" aria-label="date published">
                Publish Date: {component.data.date}
              </Typography>
            }
            {component.data.description &&
              <Box className='text-container'>
                <Typography color="textSecondary" aria-label="book description">
                  {component.data.description}
                </Typography>
              </Box>
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
