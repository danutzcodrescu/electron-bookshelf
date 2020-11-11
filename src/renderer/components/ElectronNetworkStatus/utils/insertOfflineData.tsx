import * as React from 'react';
import { useQueryCache } from 'react-query';
import { InsertAuthorMutationVariables, InsertBookMutationVariables } from '../../../generated/graphql';
import { getLocalData } from '../../../utils/save-request';

export function useInsertOfflineData(status: boolean, insertBooks: any, insertAuthors: any) {
  const cache = useQueryCache();
  React.useEffect(() => {
    if (status) {
      getLocalData()
        .then((resp) => {
          const { books, authors } = resp.reduce(
            (acc, val) => {
              if ((val as InsertAuthorMutationVariables).name) {
                acc.authors.push(val as InsertAuthorMutationVariables);
              } else {
                acc.books.push((val as any).obj as InsertBookMutationVariables);
              }
              return acc;
            },
            { books: [] as any, authors: [] as any } as {
              books: [InsertBookMutationVariables];
              authors: [InsertAuthorMutationVariables];
            },
          );
          const inserts = [];
          if (books.length) inserts.push(insertBooks(books));
          if (authors.length) inserts.push(insertAuthors(authors));
          return Promise.all(inserts);
        })
        .then(() => {
          cache.refetchQueries([]);
        });
    }
  }, [status]);
}
