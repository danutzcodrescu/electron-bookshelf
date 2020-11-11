import { Entity, BaseEntity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Author } from './Author';

@Entity()
export class Book extends BaseEntity {
  @PrimaryColumn({ type: 'text' })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  image_url?: string;

  @Column({ type: 'text' })
  genre: string;

  @Column({ type: 'text' })
  author_id: string;

  @ManyToOne('Author', 'books')
  author: Author;
}
