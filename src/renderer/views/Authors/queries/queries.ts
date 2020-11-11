import request, { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';
import {
  AuthorDetailsFragment as Details,
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
  const cache = useQueryCache();
  return useQuery('authors-list', async () => {
    try {
      const { authors } = await request<GetAuthorsDetailsQuery>(API_ENDPOINT, authorsQuery);
      return authors;
    } catch (e) {
      if (e.message.includes('Network ')) {
        return cache.getQueryData<Details>('authors-list');
      }
    }
  });
};

export function useSearchForAuthors(fn?: any) {
  return useMutation(async (name: string) => {
    try {
      const { authors } = await request<SearchForAuthorsQuery, SearchForAuthorsQueryVariables>(
        API_ENDPOINT,
        searchAuthorsQuery,
        { name: `%${name}%` },
      );
      return authors;
    } catch (e) {
      if (fn && e.message.includes('Network request failed')) {
        const data = await fn('authors', name);
        return data;
      }
      throw new Error(e);
    }
  });
}
