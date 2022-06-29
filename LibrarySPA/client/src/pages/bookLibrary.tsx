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
import { useUserPreferences } from "../hooks/useUserPreferences";

export function BookLibrary({ id }: BookLibraryProps) {
  const { prefersGenre, prefersDarkTheme, setPreferences } = useUserPreferences();
  const [search, setSearch] = useState('');

  const [componentState, setComponentState] = useState<ComponentState<BookModel[]>>({
    data: [],
    availableEntities: [],
    loading: true,
    error: undefined
  });

  const getBooks = async () => {
    try {
      const books = id ?
        await bookService.loadBooks(prefersGenre, search,id) : 
        await bookService.loadBooks(prefersGenre, search);

      setComponentState({  ...componentState, loading: false, data: books });
    } catch (exception) {
      setComponentState({ ...componentState, loading: false, error: exception });
    }
  }

  useEffect(() => { getBooks(); }, [prefersGenre, search]);

  function load(books: BookModel[] | undefined): ReactNode {
    if (!books) {
      return <Box>No results!</Box>;
    }

    return books.length > 0 ?
      <BookList books={books} /> :
      <Box m={4} textAlign="center">No Results</Box>;
  }

  function selectGenre(genre: string | undefined) {
    setPreferences({ prefersGenre: genre, prefersDarkTheme });
  }

  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined secondary button group">
        <Button onClick={() => selectGenre('novel')}>Novel</Button>
        <Button onClick={() => selectGenre('classic')}>Classic</Button>
        <Button onClick={() => selectGenre('adventure')}>Adventure</Button>
        <Button onClick={() => selectGenre('comic')}>Comic</Button>
        <Button onClick={() => selectGenre('history')}>History</Button>
        <Button onClick={() => selectGenre('fantasy')}>Fantasy</Button>
        <Button onClick={() => selectGenre('thriller')}>Thriller</Button>
        <Button onClick={() => selectGenre('horror')}>Horror</Button>
        <Button onClick={() => selectGenre('other')}>Other</Button>
        <Button onClick={() => {
          setSearch('');
          selectGenre(undefined);
        }}>Remove</Button>
      </ButtonGroup>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      <Loading loading={componentState.loading} error={componentState.error}>
        {load(componentState.data)}
      </Loading>
    </div>
  );
}
