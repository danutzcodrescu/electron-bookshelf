CREATE TABLE public.authors (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.books (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    pages integer DEFAULT 0 NOT NULL,
    genre text NOT NULL,
    author_id uuid NOT NULL,
    image_url text,
    description text
);
CREATE TABLE public.shelves (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    book_id uuid NOT NULL,
    user_id uuid NOT NULL,
    read_on date,
    read boolean DEFAULT false NOT NULL,
    wishlist boolean DEFAULT false NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    username text NOT NULL
);
ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shelves
    ADD CONSTRAINT shelves_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.shelves
    ADD CONSTRAINT shelves_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.shelves
    ADD CONSTRAINT shelves_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
