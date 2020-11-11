import { BrowserWindow, ipcMain, session } from 'electron';
import { StringDecoder } from 'string_decoder';
import { omit, uniqBy } from 'ramda';
import { getManager } from 'typeorm';
import { Authors, Books } from '../renderer/generated/graphql';
import { API_ENDPOINT } from '../constants';
import { SET_NETWORK_STATUS, SAVE_DATA, OFFLINE_SEARCH } from '../events';
import { Author } from './db/models/Author';
import { Book } from './db/models/Book';

let networkStatus: 'online' | 'offline' = 'online';

function normalizeData(data: Authors[] | Books[]): { books: Books[]; authors: Authors[] } {
  return (data as any[]).reduce(
    (acc: any, val: Books | Authors) => {
      if ((val as Authors).name) {
        acc.authors.push(omit(['books'], val as Authors));
        acc.books.push(
          ...((val as Authors).books.map((book: Books) => ({ ...book, author_id: (val as Authors).id })) || []),
        );
      } else {
        acc.books.push({ ...omit(['author'], val as Books), author_id: (val as Books).author.id });

        acc.authors.push((val as Books).author);
      }
      return acc;
    },
    { books: [], authors: [] },
  );
}

async function setOfflineData({ books, authors }: { books: Books[]; authors: Authors[] }) {
  try {
    await getManager()
      .createQueryBuilder()
      .insert()
      .into(Author)
      .values(uniqBy((author: Authors) => author.id, authors) as any)
      .execute();
    await getManager()
      .createQueryBuilder()
      .insert()
      .into(Book)
      .values(books as any)
      .execute();
  } catch (e) {
    console.log(e);
  }
}

async function fetchOfflineData(type: 'books' | 'authors', query: string) {
  if (type === 'books') {
    try {
      const books = await getManager()
        .getRepository(Book)
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.author_id', 'author')
        .where('book.title LIKE :title', { title: `%${query}%` })
        .getMany();
      return books;
    } catch (e) {
      console.log(e);
    }
  }
  try {
    const authors = await getManager()
      .getRepository(Author)
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .where('author.name LIKE :name', { name: `%${query}%` })
      .getMany();
    return authors;
  } catch (e) {
    console.log(e);
  }
}

export function offlineFunctionality(win: BrowserWindow) {
  ipcMain.on(SET_NETWORK_STATUS, async (_, value: boolean, data?: Authors[] | Books[]) => {
    networkStatus = value ? 'online' : 'offline';
    if (networkStatus === 'offline' && data) {
      const { books, authors } = normalizeData(data);
      setOfflineData({ books, authors });
    }
    if (networkStatus === 'online') {
      try {
        await getManager().createQueryBuilder().delete().from(Author).execute();
        await getManager().createQueryBuilder().delete().from(Book).execute();
      } catch (e) {
        console.log(e);
      }
    }
  });

  ipcMain.handle(OFFLINE_SEARCH, async (_, type: 'books' | 'authors', query: string) => {
    const data = await fetchOfflineData(type, query);
    return data;
  });

  // eslint-disable-next-line consistent-return
  session.defaultSession.webRequest.onBeforeRequest({ urls: [API_ENDPOINT] }, (details, callback) => {
    if (details.method === 'POST' && networkStatus === 'offline' && details.uploadData.length) {
      const decoder = new StringDecoder('utf8');
      const action = JSON.parse(decoder.write(details.uploadData[0].bytes));
      if (action.query.includes('mutation')) {
        win.webContents.send(SAVE_DATA, action.variables);
      }
      return callback({ cancel: true });
    }
    callback({ cancel: false });
  });
}
