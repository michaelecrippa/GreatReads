import { useState, ReactNode, useEffect } from "react";

import {
  Box,
  ButtonGroup,
  Button,
  Input
} from "@mui/material";

import * as _ from 'lodash';

import "./bookLibrary.css";
import { BookList } from "../components/bookList";
import { Loading } from "../components/loading";
import { BookModel } from "../models/Book/bookModel.interface";
import { bookService } from "../services/bookService";
import { ComponentState } from "../models/Components/componentState.interface";
import { BookLibraryProps } from "../models/Components/bookLibraryProps";
import { GenreDTO } from "../models/Common/genres.model";
import { formService } from "../services/formService";

export function BookLibrary({ userId }: BookLibraryProps) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setGenre] = useState<number>(1);
  const [componentState, setComponentState] = useState<ComponentState<GenreDTO, BookModel[]>>({
    data: [],
    availableEntities: [],
    loading: true,
    error: undefined
  });

  const getBooks = async () => {
    try {
      const genres = await formService.takeGenres();
      const books = userId ?
        await bookService.loadBooks(selectedGenre, search, Number(userId)) :
        await bookService.loadBooks(selectedGenre, search);

      setComponentState({ error: undefined, loading: false, data: books, availableEntities: genres });
    } catch (exception) {
      setComponentState({ ...componentState, loading: false, error: exception });
    }
  }

  useEffect(() => { if (selectedGenre) { getBooks() } }, [selectedGenre, search]);

  function loadBooks(books: BookModel[] | undefined): ReactNode {

    return books && books.length > 0 ?
      <BookList books={books} /> :
      <Box m={4} textAlign="center" style={{ color: 'black' }}>
        There aren't any books for the current filters!
      </Box>;
  }

  return (
    <Box className='container'>
      <Box className='filters-header'>
        <ButtonGroup color="primary" aria-label="outlined secondary button group">
          {
            componentState.availableEntities.map((genre: GenreDTO) =>
              <Button key={genre.id} onClick={() => setGenre(genre.id)}>
                {genre.name}
              </Button>)
          }
        </ButtonGroup>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      </Box>
      <Loading loading={componentState.loading} error={componentState.error}>
        {loadBooks(componentState.data)}
      </Loading>
    </Box>
  );
}
