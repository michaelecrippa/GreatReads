import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { bookService } from '../services/bookService';
import { formService } from '../services/formService';
import { useFormInput } from '../hooks/useInput';
import { ComponentState } from '../models/Components/componentState.interface';
import { useAsyncAction } from '../hooks/useAsyncAction';

import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import { GenreDTO } from '../models/Common/genres.model';
import './createBook.css';

export function CreateBook() {
  const navigate = useNavigate();

  const [componentState, setComponentState] = useState<ComponentState<GenreDTO, undefined>>({
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


  const { perform: submitBook, error, loading } = useAsyncAction(async () => {
    await bookService.createBook({
      title: input.title,
      author: input.author,
      genre: input.genre,
      pages: input.pages,
      description: input.description,
      date: input.date
    });

    navigate("/books/");
  }, [input]);

  async function create(event: FormEvent) {
    event.preventDefault();

    submitBook();
  }

  const globalError = globalErrorMessage(error);

  return (
    <Container className='root' maxWidth="sm">
      <Typography
        className='heading'
        component="h1"
        variant="h4"
        align="center">
        Create a book
      </Typography>

      <form className='form' onSubmit={create}>
        <TextField
          required
          label="Title"
          value={input.title}
          error={hasError('title', error)}
          helperText={errorMessageFor('title', error)}
          onChange={onChange('title')} />

        <TextField
          required
          label='Author'
          value={input.author}
          error={hasError('author', error)}
          helperText={errorMessageFor('author', error)}
          onChange={onChange('author')} />

        <TextField
          required
          label='Genre'
          value={input.genre}
          select
          error={hasError('genre', error)}
          helperText={errorMessageFor('genre', error)}
          onChange={onChange('genre')}>
          {componentState.availableEntities.map((option: GenreDTO) => (
            <MenuItem key={option.id} value={option.id}>
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
          error={hasError('pages', error)}
          helperText={errorMessageFor('pages', error)}
          onChange={onChange('pages')} />

        <TextField
          label='Description'
          value={input.description}
          error={hasError('description', error)}
          helperText={errorMessageFor('description', error)}
          onChange={onChange('description')} />

        <TextField
          label='Published date'
          type="date"
          value={input.date}
          error={hasError('date', error)}
          helperText={errorMessageFor('date', error)}
          onChange={onChange('date')}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {componentState.loading ? <CircularProgress /> : 'Submit'}
        </Button>

        {globalError && <Typography color="secondary">{globalError}</Typography>}
      </form>
    </Container>
  );
}