/* eslint-disable camelcase */
import request, { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';
import { InsertAuthorMutation, InsertAuthorMutationVariables } from '../../../generated/graphql';

const insertAuthorMutation = gql`
  mutation insertAuthor($name: String!) {
    insert_authors_one(object: { name: $name }) {
      id
    }
  }
`;

export function useInsertAuthor() {
  return useMutation(async (name: string) => {
    const { insert_authors_one } = await request<InsertAuthorMutation, InsertAuthorMutationVariables>(
      API_ENDPOINT,
      insertAuthorMutation,
      { name },
    );
    return insert_authors_one;
  });
}
