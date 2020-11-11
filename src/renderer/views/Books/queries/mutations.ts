/* eslint-disable camelcase */
import { request, gql } from 'graphql-request';
import { useMutation, useQueryCache } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';
import {
  Books_Insert_Input,
  InsertBookMutation,
  InsertBookMutationVariables,
  InsertBooksMutation,
  InsertBooksMutationVariables,
} from '../../../generated/graphql';

const insertBookMutation = gql`
  mutation insertBook($obj: books_insert_input!) {
    insert_books_one(object: $obj) {
      id
    }
  }
`;

const insertBooksMutation = gql`
  mutation insertBooks($objects: [books_insert_input!]!) {
    insert_books(objects: $objects) {
      returning {
        id
        title
      }
    }
  }
`;

export function useInsertBook() {
  const cache = useQueryCache();
  return useMutation(async (obj: Books_Insert_Input) => {
    try {
      const { insert_books_one } = await request<InsertBookMutation, InsertBookMutationVariables>(
        API_ENDPOINT,
        insertBookMutation,
        {
          obj,
        },
      );
      return insert_books_one;
    } catch (e) {
      if (e.message.includes('Network request failed')) {
        cache.setQueryData('books', (books: any) => [...(books || []), { ...obj }]);
        return true;
      }
      throw new Error(e);
    }
  });
}

export function useInsertBooks() {
  return useMutation(async (objects: any) => {
    const { insert_books } = await request<InsertBooksMutation, InsertBooksMutationVariables>(
      API_ENDPOINT,
      insertBooksMutation,
      { objects } as any,
    );
    return insert_books;
  });
}
