import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';
import { API_ENDPOINT } from '../../../../constants';

const getBooksQuery = gql`
  query getBooks {
    books {
      id
      title
      author {
        id
        name
      }
      genre
    }
  }
`;

export function useBooks() {
  return useQuery('books', async () => {
    const { books } = await request(API_ENDPOINT, getBooksQuery);
    return books;
  });
}
