import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { bookService } from '../services/bookService';
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

//todo select genres from db
const genres = [
  { value: 'Novel' },
  { value: 'Fantasy' },
  { value: 'History' },
  { value: 'Horror' },
  { value: 'Classic' },
  { value: 'Adventure' },
  { value: 'Comic' },
  { value: 'Thriller' },
  { value: 'Other' },
];

export function CreateBook() {
  const navigate = useNavigate();

  const [componentState, setComponentState] = useState<ComponentState<undefined>>({
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

  async function create(event: FormEvent) {
    event.preventDefault();

    createBook();
  }

  const createBook = async () => {
    //TODO update component state
    await bookService.createBook({
      title: input.title,
      author: input.author,
      genre: input.genre.toLocaleLowerCase(),
      pages: input.pages,
      description: input.description,
      date: input.date
    });

    navigate('/');
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
          {genres.map((option) => (
            <MenuItem value={option.value}>
              {option.value}
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