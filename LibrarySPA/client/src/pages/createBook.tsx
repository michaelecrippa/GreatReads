import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { bookService } from '../services/bookService';
import { formService } from '../services/formService';
import { useFormInput } from '../hooks/useInput';
import { ComponentState } from '../models/Components/componentState.interface';

import { 
  Button, 
  CircularProgress, 
  Container, 
  TextField, 
  Typography, 
  MenuItem 
} from '@mui/material';
import { GenreDTO } from '../models/Common/genres.model';

export function CreateBook() {
  const navigate = useNavigate();

  const [componentState, setComponentState] = useState<ComponentState<GenreDTO>>({
    data: undefined,
    availableEntities: [],
    loading: true,
    error: undefined
  });

  const {
    input,
    onChange,
    hasError,
    errorMessageFor,
    globalErrorMessage
  } = useFormInput({
    title: '',
    author: '',
    genre: '',
    pages: '',
    description: '',
    date: ''
  });

  const getGenres = async () => {
    try {
      const genres = await formService.takeGenres();

      setComponentState({ availableEntities: genres, loading: false, error: undefined, data: undefined });
    } catch (exception) {
      setComponentState({ availableEntities: [], loading: false, error: exception, data: undefined });
    }
  }

  useEffect(() => { getGenres() }, [])

  async function create(event: FormEvent) {
    event.preventDefault();

    try {
      createBook();
    } catch (exception) {
      setComponentState({ ...componentState, error: exception });
    }

    navigate('/');
  }

  const createBook = async () => {
    await bookService.createBook({
      title: input.title,
      author: input.author,
      genre: input.genre.toLocaleLowerCase(),
      pages: input.pages,
      description: input.description,
      date: input.date
    });
  }

  const globalError = globalErrorMessage(componentState.error);

  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h4"
        align="center">Create a book
      </Typography>

      <form onSubmit={create}>
        <TextField
          label="Title"
          value={input.title}
          error={hasError('title', componentState.error)}
          helperText={errorMessageFor('title', componentState.error)}
          onChange={onChange('title')} />

        <TextField
          label='Author'
          value={input.author}
          error={hasError('author', componentState.error)}
          helperText={errorMessageFor('author', componentState.error)}
          onChange={onChange('author')} />

        <TextField
          label='Genre'
          value={input.genre}
          select
          error={hasError('genre', componentState.error)}
          helperText={errorMessageFor('genre', componentState.error)}
          onChange={onChange('genre')}>
          {componentState.availableEntities.map((option: GenreDTO) => (
            <MenuItem value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Pages"
          type="number"
          inputProps={{
            min: '1',
            step: 1
          }}
          value={input.pages}
          error={hasError('pages', componentState.error)}
          helperText={errorMessageFor('pages', componentState.error)}
          onChange={onChange('pages')} />


        <TextField
          label='Description'
          value={input.description}
          error={hasError('description', componentState.error)}
          helperText={errorMessageFor('description', componentState.error)}
          onChange={onChange('description')} />

        <TextField
          label='Published date'
          type="date"
          defaultValue="2012.12.12"
          value={input.date}
          error={hasError('date', componentState.error)}
          helperText={errorMessageFor('date', componentState.error)}
          onChange={onChange('date')}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button type="submit" variant="contained" disabled={componentState.loading}>
          {componentState.loading ? <CircularProgress /> : 'Submit'}
        </Button>

        {globalError && <Typography color="secondary">{globalError}</Typography>}
      </form>
    </Container>
  );
}