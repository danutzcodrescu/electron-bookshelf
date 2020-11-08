import request, { gql } from 'graphql-request';
import { useMutation, useQuery } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';
import {
  GetAuthorsDetailsQuery,
  SearchForAuthorsQuery,
  SearchForAuthorsQueryVariables,
} from '../../../generated/graphql';

const AuthorDetailsFragment = gql`
  fragment AuthorDetails on authors {
    id
    name
    books {
      id
      title
      pages
      genre
      description
      image_url
    }
  }
`;

const authorsQuery = gql`
  query getAuthorsDetails {
    authors {
      ...AuthorDetails
    }
  }
  ${AuthorDetailsFragment}
`;

const searchAuthorsQuery = gql`
  query searchForAuthors($name: String!) {
    authors(where: { name: { _ilike: $name } }) {
      ...AuthorDetails
    }
  }
  ${AuthorDetailsFragment}
`;

export const useAuthors = () => {
  return useQuery('authors-list', async () => {
    const { authors } = await request<GetAuthorsDetailsQuery>(API_ENDPOINT, authorsQuery);
    return authors;
  });
};

export function useSearchForAuthors() {
  return useMutation(async (name: string) => {
    const { authors } = await request<SearchForAuthorsQuery, SearchForAuthorsQueryVariables>(
      API_ENDPOINT,
      searchAuthorsQuery,
      { name: `%${name}%` },
    );
    return authors;
  });
}
