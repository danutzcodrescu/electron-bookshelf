/* eslint-disable camelcase */
import { offlineSearch } from 'components/ElectronNetworkStatus/utils/offlineSearch';
import { gql, request } from 'graphql-request';
import { useMutation, useQuery } from 'react-query';
import {
  SearchForBooksQuery,
  SearchForBooksQueryVariables,
  GetBooksQuery,
  GetAuthorsQuery,
} from 'src/renderer/generated/graphql';
import { API_ENDPOINT } from '../../../../constants';

const BookDetailsFragment = gql`
  fragment BookDetails on books {
    id
    title
    author {
      id
      name
    }
    genre
    image_url
    description
  }
`;

const getBooksQuery = gql`
  query getBooks {
    books {
      ...BookDetails
    }
  }

  ${BookDetailsFragment}
`;

const searchForBooks = gql`
  query searchForBooks($title: String!) {
    books(where: { title: { _ilike: $title } }) {
      ...BookDetails
    }
  }

  ${BookDetailsFragment}
`;

const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`;

export function useBooks() {
  return useQuery('books', async () => {
    const { books } = await request<GetBooksQuery>(API_ENDPOINT, getBooksQuery);
    return books;
  });
}

export function useSearchForBooks(fn?: any) {
  return useMutation(async (title: string) => {
    try {
      const { books } = await request<SearchForBooksQuery, SearchForBooksQueryVariables>(API_ENDPOINT, searchForBooks, {
        title: `%${title}%`,
      });
      return books;
    } catch (e) {
      if (fn && e.message.includes('Network request failed')) {
        const data = await fn('books', title);
        return data;
      }
      throw new Error(e);
    }
  });
}

export function useGetAuthors() {
  return useQuery('authors', async () => {
    const { authors } = await request<GetAuthorsQuery>(API_ENDPOINT, getAuthorsQuery);
    return authors;
  });
}
