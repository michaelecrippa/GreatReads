import { BookCard } from './bookCard';
import { BookListProps } from '../models/Components/bookListProps';
import { formService } from '../services/formService';
import { ComponentState } from '../models/Components/componentState.interface';
import { GenreDTO } from '../models/Common/genres.model';

import { useState, useEffect } from 'react';

import * as  _ from 'lodash';

import { Box } from '@mui/material/';

export function BookList({ books }: BookListProps) {
  let [component, setComponentState] = useState<ComponentState<GenreDTO, undefined>>({
    data: undefined,
    loading: true,
    error: undefined,
    availableEntities: []
  });

  const getGenres = async () => {
    try {
      const genres = await formService.takeGenres();

      setComponentState({ data: undefined, loading: false, error: undefined, availableEntities: genres });
    } catch (exception) {
      setComponentState({ data: undefined, loading: false, error: exception, availableEntities: [] });
    }
  }
  useEffect(() => { getGenres() }, [])

  return (
    <Box style={{height: '100vh'}}>
      {_.chunk(books, 3).map((cardsRow, index) => 
      <Box key={index} style={{display: 'flex', flexDirection: 'row', gap: '50px', margin: '50px'}}>
        { cardsRow.map(book => <BookCard key={book.id} book={book} genres={component.availableEntities}/>)}
      </Box>)}
    </Box>
  );
}
