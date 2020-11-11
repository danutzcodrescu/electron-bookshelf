/* eslint-disable camelcase */
import request, { gql } from 'graphql-request';
import { useMutation, useQueryCache } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';
import {
  InsertAuthorMutation,
  InsertAuthorMutationVariables,
  InsertAuthorsMutation,
  InsertAuthorsMutationVariables,
} from '../../../generated/graphql';

const insertAuthorMutation = gql`
  mutation insertAuthor($name: String!) {
    insert_authors_one(object: { name: $name }) {
      id
    }
  }
`;

const insertAuthorsMutation = gql`
  mutation insertAuthors($objects: [authors_insert_input!]!) {
    insert_authors(objects: $objects) {
      returning {
        id
        name
      }
    }
  }
`;

export function useInsertAuthor() {
  const cache = useQueryCache();
  return useMutation(async (name: string) => {
    try {
      const { insert_authors_one } = await request<InsertAuthorMutation, InsertAuthorMutationVariables>(
        API_ENDPOINT,
        insertAuthorMutation,
        { name },
      );
      return insert_authors_one;
    } catch (e) {
      if (e.message.includes('Network request failed')) {
        cache.setQueryData('authors-list', (authors: any) => [...(authors || []), { name, books: [] }]);
        return true;
      }
      throw new Error(e);
    }
  });
}

export function useInsertAuthors() {
  return useMutation(async (objects: InsertAuthorMutationVariables) => {
    const { insert_authors } = await request<InsertAuthorsMutation, InsertAuthorsMutationVariables>(
      API_ENDPOINT,
      insertAuthorsMutation,
      { objects } as any,
    );
    return insert_authors;
  });
}
