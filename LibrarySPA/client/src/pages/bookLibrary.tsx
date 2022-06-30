import { useState, ReactNode, useEffect } from "react";
import { 
  Box,
  ButtonGroup,
  Button,
  Input
} from "@mui/material";

import { BookList } from "../components/bookList";
import { Loading } from "../components/loading";
import { BookLibraryProps } from "../models/Components/bookLibraryProps";
import { BookModel } from "../models/Book/bookModel.interface";
import { bookService } from "../services/bookService";
import { ComponentState } from "../models/Components/componentState.interface";
import { GENRES } from "../constats/genreConstants";

export function BookLibrary({ id }: BookLibraryProps) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setGenre] = useState<string>(GENRES[0].toLowerCase());

  const [componentState, setComponentState] = useState<ComponentState<BookModel[]>>({
    data: [],
    availableEntities: [],
    loading: true,
    error: undefined
  });

  const getBooks = async () => {
    try {
      const books = id ?
        await bookService.loadBooks(selectedGenre, search,id) : 
        await bookService.loadBooks(selectedGenre, search);

      setComponentState({ ...componentState, loading: false, data: books });
    } catch (exception) {
      setComponentState({ ...componentState, loading: false, error: exception });
    }
  }

  useEffect(() => { if (selectedGenre) {getBooks()} }, [selectedGenre, search]);

  function load(books: BookModel[] | undefined): ReactNode {
    if (!books) {
      return <Box>No results!</Box>;
    }

    return books.length > 0 ?
      <BookList books={books} /> :
      <Box m={4} textAlign="center">No Results</Box>;
  }

  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined secondary button group">
        {
          GENRES.map((genre: string) => 
            <Button onClick={() => setGenre(genre.toLowerCase())}>
              {genre}
            </Button>)
        }
      </ButtonGroup>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      <Loading loading={componentState.loading} error={componentState.error}>
        {load(componentState.data)}
      </Loading>
    </div>
  );
}
