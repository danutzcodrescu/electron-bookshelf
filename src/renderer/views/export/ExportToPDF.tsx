import { ipcRenderer } from 'electron';
import * as React from 'react';
import { AuthorDetailsFragment, BookDetailsFragment } from 'src/renderer/generated/graphql';
import { AuthorsList } from 'views/Authors/components/AuthorsList';
import { BooksList } from 'views/Books/components/BooksList';
import { DATA_RENDERED, LOAD_DATA_FOR_PDF } from '../../../events';

export function ExportToPDF() {
  const [data, setData] = React.useState<AuthorDetailsFragment[] | BookDetailsFragment[]>();
  function extractData(_: any, elements: BookDetailsFragment[] | AuthorDetailsFragment[]) {
    setData(elements);
  }
  React.useEffect(() => {
    ipcRenderer.on(LOAD_DATA_FOR_PDF, extractData);
    return () => {
      ipcRenderer.off(LOAD_DATA_FOR_PDF, extractData);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      ipcRenderer.send(
        DATA_RENDERED,
        ((data as BookDetailsFragment[])[0] as BookDetailsFragment)?.author ? 'books' : 'authors',
      );
    }
  }, [data]);

  if (!data) return <p>loading</p>;

  if (((data as BookDetailsFragment[])?.[0] as BookDetailsFragment)?.author) {
    return <BooksList books={data as BookDetailsFragment[]} />;
  }
  return <AuthorsList authors={data as AuthorDetailsFragment[]} />;
}
