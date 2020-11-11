import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Book } from './Book';

@Entity()
export class Author extends BaseEntity {
  @PrimaryColumn({ type: 'text' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @OneToMany('Book', 'author')
  books: Book[];
}
