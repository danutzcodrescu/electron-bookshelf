import { createConnection } from 'typeorm';
import path from 'path';
import { app } from 'electron';
import { Author } from './models/Author';
import { Book } from './models/Book';

export async function bootstrap() {
  try {
    await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      database:
        process.env.NODE_ENV === 'development'
          ? path.resolve(__dirname, '../db', 'database.sqlite')
          : path.resolve(app.getPath('documents'), 'bookshelf', 'db', 'database.sqlite'),
      entities: [Book, Author],
    });
  } catch (e) {
    console.log(e);
  }
}
