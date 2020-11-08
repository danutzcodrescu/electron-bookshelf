/* eslint-disable camelcase */
import { gql, request } from 'graphql-request';
import { useMutation, useQuery } from 'react-query';
import {
  SearchForBooksQuery,
  SearchForBooksQueryVariables,
  GetBooksQuery,
  GetAuthorsQuery,
  InsertBookMutation,
  InsertBookMutationVariables,
  Books_Insert_Input,
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

const insertBookMutation = gql`
  mutation insertBook($obj: books_insert_input!) {
    insert_books_one(object: $obj) {
      id
    }
  }
`;

export function useBooks() {
  return useQuery('books', async () => {
    const { books } = await request<GetBooksQuery>(API_ENDPOINT, getBooksQuery);
    return books;
  });
}

export function useSearchForBooks() {
  return useMutation(async (title: string) => {
    const { books } = await request<SearchForBooksQuery, SearchForBooksQueryVariables>(API_ENDPOINT, searchForBooks, {
      title: `%${title}%`,
    });
    return books;
  });
}

export function useGetAuthors() {
  return useQuery('authors', async () => {
    const { authors } = await request<GetAuthorsQuery>(API_ENDPOINT, getAuthorsQuery);
    return authors;
  });
}

export function useInsertBook() {
  return useMutation(async (obj: Books_Insert_Input) => {
    const { insert_books_one } = await request<InsertBookMutation, InsertBookMutationVariables>(
      API_ENDPOINT,
      insertBookMutation,
      {
        obj,
      },
    );
    return insert_books_one;
  });
}
