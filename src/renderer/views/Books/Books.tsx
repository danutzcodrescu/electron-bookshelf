import * as React from 'react';
import { Create } from 'components/Create/Create';
import { ExportToPDFIcon } from 'components/ExportToPDFIcon/ExportToPDFIcon';
import { BookDetailsFragment } from '../../generated/graphql';
import { useBooks, useSearchForBooks } from './queries/queries';
import { Search } from './components/Search';
import { BooksList } from './components/BooksList';

export const Books = () => {
  const [books, setBooks] = React.useState<BookDetailsFragment[]>([]);
  const { data, error, isFetching } = useBooks();
  const [mutate, { data: searchResults, isLoading, error: searchError }] = useSearchForBooks();

  function reset() {
    setBooks(data || []);
  }

  React.useEffect(() => {
    setBooks(data || []);
  }, [data]);

  React.useEffect(() => {
    if (searchResults) {
      setBooks(searchResults || []);
    }
  }, [searchResults]);

  return (
    <>
      <Search onSearch={mutate} clear={reset} placeholder="Search for books">
        <Create to="books" title="New book" />
        <ExportToPDFIcon data={books} />
      </Search>
      {isLoading || isFetching ? <p>loading</p> : null}
      {!isFetching && !isLoading ? <BooksList books={books} /> : null}
    </>
  );
};
