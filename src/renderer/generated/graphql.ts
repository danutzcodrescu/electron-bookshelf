export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  uuid: any;
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export interface Boolean_Comparison_Exp {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export interface Int_Comparison_Exp {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export interface String_Comparison_Exp {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
}

/** columns and relationships of "authors" */
export interface Authors {
  __typename?: 'authors';
  /** An array relationship */
  books: Array<Books>;
  /** An aggregated array relationship */
  books_aggregate: Books_Aggregate;
  id: Scalars['uuid'];
  name: Scalars['String'];
}

/** columns and relationships of "authors" */
export interface AuthorsBooksArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** columns and relationships of "authors" */
export interface AuthorsBooks_AggregateArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** aggregated selection of "authors" */
export interface Authors_Aggregate {
  __typename?: 'authors_aggregate';
  aggregate?: Maybe<Authors_Aggregate_Fields>;
  nodes: Array<Authors>;
}

/** aggregate fields of "authors" */
export interface Authors_Aggregate_Fields {
  __typename?: 'authors_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Authors_Max_Fields>;
  min?: Maybe<Authors_Min_Fields>;
}

/** aggregate fields of "authors" */
export interface Authors_Aggregate_FieldsCountArgs {
  columns?: Maybe<Array<Authors_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "authors" */
export interface Authors_Aggregate_Order_By {
  count?: Maybe<Order_By>;
  max?: Maybe<Authors_Max_Order_By>;
  min?: Maybe<Authors_Min_Order_By>;
}

/** input type for inserting array relation for remote table "authors" */
export interface Authors_Arr_Rel_Insert_Input {
  data: Array<Authors_Insert_Input>;
  on_conflict?: Maybe<Authors_On_Conflict>;
}

/** Boolean expression to filter rows from the table "authors". All fields are combined with a logical 'AND'. */
export interface Authors_Bool_Exp {
  _and?: Maybe<Array<Maybe<Authors_Bool_Exp>>>;
  _not?: Maybe<Authors_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Authors_Bool_Exp>>>;
  books?: Maybe<Books_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
}

/** unique or primary key constraints on table "authors" */
export enum Authors_Constraint {
  /** unique or primary key constraint */
  AuthorsPkey = 'authors_pkey',
}

/** input type for inserting data into table "authors" */
export interface Authors_Insert_Input {
  books?: Maybe<Books_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
}

/** aggregate max on columns */
export interface Authors_Max_Fields {
  __typename?: 'authors_max_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
}

/** order by max() on columns of table "authors" */
export interface Authors_Max_Order_By {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
}

/** aggregate min on columns */
export interface Authors_Min_Fields {
  __typename?: 'authors_min_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
}

/** order by min() on columns of table "authors" */
export interface Authors_Min_Order_By {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
}

/** response of any mutation on the table "authors" */
export interface Authors_Mutation_Response {
  __typename?: 'authors_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Authors>;
}

/** input type for inserting object relation for remote table "authors" */
export interface Authors_Obj_Rel_Insert_Input {
  data: Authors_Insert_Input;
  on_conflict?: Maybe<Authors_On_Conflict>;
}

/** on conflict condition type for table "authors" */
export interface Authors_On_Conflict {
  constraint: Authors_Constraint;
  update_columns: Array<Authors_Update_Column>;
  where?: Maybe<Authors_Bool_Exp>;
}

/** ordering options when selecting data from "authors" */
export interface Authors_Order_By {
  books_aggregate?: Maybe<Books_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
}

/** primary key columns input for table: "authors" */
export interface Authors_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "authors" */
export enum Authors_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "authors" */
export interface Authors_Set_Input {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
}

/** update columns of table "authors" */
export enum Authors_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** columns and relationships of "books" */
export interface Books {
  __typename?: 'books';
  /** An object relationship */
  author: Authors;
  author_id: Scalars['uuid'];
  description?: Maybe<Scalars['String']>;
  genre: Scalars['String'];
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  pages: Scalars['Int'];
  /** An array relationship */
  shelves: Array<Shelves>;
  /** An aggregated array relationship */
  shelves_aggregate: Shelves_Aggregate;
  title: Scalars['String'];
}

/** columns and relationships of "books" */
export interface BooksShelvesArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** columns and relationships of "books" */
export interface BooksShelves_AggregateArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** aggregated selection of "books" */
export interface Books_Aggregate {
  __typename?: 'books_aggregate';
  aggregate?: Maybe<Books_Aggregate_Fields>;
  nodes: Array<Books>;
}

/** aggregate fields of "books" */
export interface Books_Aggregate_Fields {
  __typename?: 'books_aggregate_fields';
  avg?: Maybe<Books_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Books_Max_Fields>;
  min?: Maybe<Books_Min_Fields>;
  stddev?: Maybe<Books_Stddev_Fields>;
  stddev_pop?: Maybe<Books_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Books_Stddev_Samp_Fields>;
  sum?: Maybe<Books_Sum_Fields>;
  var_pop?: Maybe<Books_Var_Pop_Fields>;
  var_samp?: Maybe<Books_Var_Samp_Fields>;
  variance?: Maybe<Books_Variance_Fields>;
}

/** aggregate fields of "books" */
export interface Books_Aggregate_FieldsCountArgs {
  columns?: Maybe<Array<Books_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "books" */
export interface Books_Aggregate_Order_By {
  avg?: Maybe<Books_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Books_Max_Order_By>;
  min?: Maybe<Books_Min_Order_By>;
  stddev?: Maybe<Books_Stddev_Order_By>;
  stddev_pop?: Maybe<Books_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Books_Stddev_Samp_Order_By>;
  sum?: Maybe<Books_Sum_Order_By>;
  var_pop?: Maybe<Books_Var_Pop_Order_By>;
  var_samp?: Maybe<Books_Var_Samp_Order_By>;
  variance?: Maybe<Books_Variance_Order_By>;
}

/** input type for inserting array relation for remote table "books" */
export interface Books_Arr_Rel_Insert_Input {
  data: Array<Books_Insert_Input>;
  on_conflict?: Maybe<Books_On_Conflict>;
}

/** aggregate avg on columns */
export interface Books_Avg_Fields {
  __typename?: 'books_avg_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by avg() on columns of table "books" */
export interface Books_Avg_Order_By {
  pages?: Maybe<Order_By>;
}

/** Boolean expression to filter rows from the table "books". All fields are combined with a logical 'AND'. */
export interface Books_Bool_Exp {
  _and?: Maybe<Array<Maybe<Books_Bool_Exp>>>;
  _not?: Maybe<Books_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Books_Bool_Exp>>>;
  author?: Maybe<Authors_Bool_Exp>;
  author_id?: Maybe<Uuid_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  genre?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image_url?: Maybe<String_Comparison_Exp>;
  pages?: Maybe<Int_Comparison_Exp>;
  shelves?: Maybe<Shelves_Bool_Exp>;
  title?: Maybe<String_Comparison_Exp>;
}

/** unique or primary key constraints on table "books" */
export enum Books_Constraint {
  /** unique or primary key constraint */
  BooksPkey = 'books_pkey',
}

/** input type for incrementing integer column in table "books" */
export interface Books_Inc_Input {
  pages?: Maybe<Scalars['Int']>;
}

/** input type for inserting data into table "books" */
export interface Books_Insert_Input {
  author?: Maybe<Authors_Obj_Rel_Insert_Input>;
  author_id?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  shelves?: Maybe<Shelves_Arr_Rel_Insert_Input>;
  title?: Maybe<Scalars['String']>;
}

/** aggregate max on columns */
export interface Books_Max_Fields {
  __typename?: 'books_max_fields';
  author_id?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
}

/** order by max() on columns of table "books" */
export interface Books_Max_Order_By {
  author_id?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  genre?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image_url?: Maybe<Order_By>;
  pages?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
}

/** aggregate min on columns */
export interface Books_Min_Fields {
  __typename?: 'books_min_fields';
  author_id?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
}

/** order by min() on columns of table "books" */
export interface Books_Min_Order_By {
  author_id?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  genre?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image_url?: Maybe<Order_By>;
  pages?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
}

/** response of any mutation on the table "books" */
export interface Books_Mutation_Response {
  __typename?: 'books_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Books>;
}

/** input type for inserting object relation for remote table "books" */
export interface Books_Obj_Rel_Insert_Input {
  data: Books_Insert_Input;
  on_conflict?: Maybe<Books_On_Conflict>;
}

/** on conflict condition type for table "books" */
export interface Books_On_Conflict {
  constraint: Books_Constraint;
  update_columns: Array<Books_Update_Column>;
  where?: Maybe<Books_Bool_Exp>;
}

/** ordering options when selecting data from "books" */
export interface Books_Order_By {
  author?: Maybe<Authors_Order_By>;
  author_id?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  genre?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image_url?: Maybe<Order_By>;
  pages?: Maybe<Order_By>;
  shelves_aggregate?: Maybe<Shelves_Aggregate_Order_By>;
  title?: Maybe<Order_By>;
}

/** primary key columns input for table: "books" */
export interface Books_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "books" */
export enum Books_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Description = 'description',
  /** column name */
  Genre = 'genre',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Pages = 'pages',
  /** column name */
  Title = 'title',
}

/** input type for updating data in table "books" */
export interface Books_Set_Input {
  author_id?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
}

/** aggregate stddev on columns */
export interface Books_Stddev_Fields {
  __typename?: 'books_stddev_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by stddev() on columns of table "books" */
export interface Books_Stddev_Order_By {
  pages?: Maybe<Order_By>;
}

/** aggregate stddev_pop on columns */
export interface Books_Stddev_Pop_Fields {
  __typename?: 'books_stddev_pop_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by stddev_pop() on columns of table "books" */
export interface Books_Stddev_Pop_Order_By {
  pages?: Maybe<Order_By>;
}

/** aggregate stddev_samp on columns */
export interface Books_Stddev_Samp_Fields {
  __typename?: 'books_stddev_samp_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by stddev_samp() on columns of table "books" */
export interface Books_Stddev_Samp_Order_By {
  pages?: Maybe<Order_By>;
}

/** aggregate sum on columns */
export interface Books_Sum_Fields {
  __typename?: 'books_sum_fields';
  pages?: Maybe<Scalars['Int']>;
}

/** order by sum() on columns of table "books" */
export interface Books_Sum_Order_By {
  pages?: Maybe<Order_By>;
}

/** update columns of table "books" */
export enum Books_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Description = 'description',
  /** column name */
  Genre = 'genre',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Pages = 'pages',
  /** column name */
  Title = 'title',
}

/** aggregate var_pop on columns */
export interface Books_Var_Pop_Fields {
  __typename?: 'books_var_pop_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by var_pop() on columns of table "books" */
export interface Books_Var_Pop_Order_By {
  pages?: Maybe<Order_By>;
}

/** aggregate var_samp on columns */
export interface Books_Var_Samp_Fields {
  __typename?: 'books_var_samp_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by var_samp() on columns of table "books" */
export interface Books_Var_Samp_Order_By {
  pages?: Maybe<Order_By>;
}

/** aggregate variance on columns */
export interface Books_Variance_Fields {
  __typename?: 'books_variance_fields';
  pages?: Maybe<Scalars['Float']>;
}

/** order by variance() on columns of table "books" */
export interface Books_Variance_Order_By {
  pages?: Maybe<Order_By>;
}

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export interface Date_Comparison_Exp {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
}

/** mutation root */
export interface Mutation_Root {
  __typename?: 'mutation_root';
  /** delete data from the table: "authors" */
  delete_authors?: Maybe<Authors_Mutation_Response>;
  /** delete single row from the table: "authors" */
  delete_authors_by_pk?: Maybe<Authors>;
  /** delete data from the table: "books" */
  delete_books?: Maybe<Books_Mutation_Response>;
  /** delete single row from the table: "books" */
  delete_books_by_pk?: Maybe<Books>;
  /** delete data from the table: "shelves" */
  delete_shelves?: Maybe<Shelves_Mutation_Response>;
  /** delete single row from the table: "shelves" */
  delete_shelves_by_pk?: Maybe<Shelves>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "authors" */
  insert_authors?: Maybe<Authors_Mutation_Response>;
  /** insert a single row into the table: "authors" */
  insert_authors_one?: Maybe<Authors>;
  /** insert data into the table: "books" */
  insert_books?: Maybe<Books_Mutation_Response>;
  /** insert a single row into the table: "books" */
  insert_books_one?: Maybe<Books>;
  /** insert data into the table: "shelves" */
  insert_shelves?: Maybe<Shelves_Mutation_Response>;
  /** insert a single row into the table: "shelves" */
  insert_shelves_one?: Maybe<Shelves>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "authors" */
  update_authors?: Maybe<Authors_Mutation_Response>;
  /** update single row of the table: "authors" */
  update_authors_by_pk?: Maybe<Authors>;
  /** update data of the table: "books" */
  update_books?: Maybe<Books_Mutation_Response>;
  /** update single row of the table: "books" */
  update_books_by_pk?: Maybe<Books>;
  /** update data of the table: "shelves" */
  update_shelves?: Maybe<Shelves_Mutation_Response>;
  /** update single row of the table: "shelves" */
  update_shelves_by_pk?: Maybe<Shelves>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
}

/** mutation root */
export interface Mutation_RootDelete_AuthorsArgs {
  where: Authors_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Authors_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_BooksArgs {
  where: Books_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Books_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_ShelvesArgs {
  where: Shelves_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Shelves_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootDelete_UsersArgs {
  where: Users_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootDelete_Users_By_PkArgs {
  id: Scalars['uuid'];
}

/** mutation root */
export interface Mutation_RootInsert_AuthorsArgs {
  objects: Array<Authors_Insert_Input>;
  on_conflict?: Maybe<Authors_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Authors_OneArgs {
  object: Authors_Insert_Input;
  on_conflict?: Maybe<Authors_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_BooksArgs {
  objects: Array<Books_Insert_Input>;
  on_conflict?: Maybe<Books_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Books_OneArgs {
  object: Books_Insert_Input;
  on_conflict?: Maybe<Books_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_ShelvesArgs {
  objects: Array<Shelves_Insert_Input>;
  on_conflict?: Maybe<Shelves_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Shelves_OneArgs {
  object: Shelves_Insert_Input;
  on_conflict?: Maybe<Shelves_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_UsersArgs {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootInsert_Users_OneArgs {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
}

/** mutation root */
export interface Mutation_RootUpdate_AuthorsArgs {
  _set?: Maybe<Authors_Set_Input>;
  where: Authors_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Authors_By_PkArgs {
  _set?: Maybe<Authors_Set_Input>;
  pk_columns: Authors_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_BooksArgs {
  _inc?: Maybe<Books_Inc_Input>;
  _set?: Maybe<Books_Set_Input>;
  where: Books_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Books_By_PkArgs {
  _inc?: Maybe<Books_Inc_Input>;
  _set?: Maybe<Books_Set_Input>;
  pk_columns: Books_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_ShelvesArgs {
  _set?: Maybe<Shelves_Set_Input>;
  where: Shelves_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Shelves_By_PkArgs {
  _set?: Maybe<Shelves_Set_Input>;
  pk_columns: Shelves_Pk_Columns_Input;
}

/** mutation root */
export interface Mutation_RootUpdate_UsersArgs {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
}

/** mutation root */
export interface Mutation_RootUpdate_Users_By_PkArgs {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export interface Query_Root {
  __typename?: 'query_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "books" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "shelves" */
  shelves: Array<Shelves>;
  /** fetch aggregated fields from the table: "shelves" */
  shelves_aggregate: Shelves_Aggregate;
  /** fetch data from the table: "shelves" using primary key columns */
  shelves_by_pk?: Maybe<Shelves>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
}

/** query root */
export interface Query_RootAuthorsArgs {
  distinct_on?: Maybe<Array<Authors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Authors_Order_By>>;
  where?: Maybe<Authors_Bool_Exp>;
}

/** query root */
export interface Query_RootAuthors_AggregateArgs {
  distinct_on?: Maybe<Array<Authors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Authors_Order_By>>;
  where?: Maybe<Authors_Bool_Exp>;
}

/** query root */
export interface Query_RootAuthors_By_PkArgs {
  id: Scalars['uuid'];
}

/** query root */
export interface Query_RootBooksArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** query root */
export interface Query_RootBooks_AggregateArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** query root */
export interface Query_RootBooks_By_PkArgs {
  id: Scalars['uuid'];
}

/** query root */
export interface Query_RootShelvesArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** query root */
export interface Query_RootShelves_AggregateArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** query root */
export interface Query_RootShelves_By_PkArgs {
  id: Scalars['uuid'];
}

/** query root */
export interface Query_RootUsersArgs {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
}

/** query root */
export interface Query_RootUsers_AggregateArgs {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
}

/** query root */
export interface Query_RootUsers_By_PkArgs {
  id: Scalars['uuid'];
}

/** columns and relationships of "shelves" */
export interface Shelves {
  __typename?: 'shelves';
  /** An object relationship */
  book: Books;
  book_id: Scalars['uuid'];
  id: Scalars['uuid'];
  read: Scalars['Boolean'];
  read_on?: Maybe<Scalars['date']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
  wishlist: Scalars['Boolean'];
}

/** aggregated selection of "shelves" */
export interface Shelves_Aggregate {
  __typename?: 'shelves_aggregate';
  aggregate?: Maybe<Shelves_Aggregate_Fields>;
  nodes: Array<Shelves>;
}

/** aggregate fields of "shelves" */
export interface Shelves_Aggregate_Fields {
  __typename?: 'shelves_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Shelves_Max_Fields>;
  min?: Maybe<Shelves_Min_Fields>;
}

/** aggregate fields of "shelves" */
export interface Shelves_Aggregate_FieldsCountArgs {
  columns?: Maybe<Array<Shelves_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "shelves" */
export interface Shelves_Aggregate_Order_By {
  count?: Maybe<Order_By>;
  max?: Maybe<Shelves_Max_Order_By>;
  min?: Maybe<Shelves_Min_Order_By>;
}

/** input type for inserting array relation for remote table "shelves" */
export interface Shelves_Arr_Rel_Insert_Input {
  data: Array<Shelves_Insert_Input>;
  on_conflict?: Maybe<Shelves_On_Conflict>;
}

/** Boolean expression to filter rows from the table "shelves". All fields are combined with a logical 'AND'. */
export interface Shelves_Bool_Exp {
  _and?: Maybe<Array<Maybe<Shelves_Bool_Exp>>>;
  _not?: Maybe<Shelves_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Shelves_Bool_Exp>>>;
  book?: Maybe<Books_Bool_Exp>;
  book_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  read?: Maybe<Boolean_Comparison_Exp>;
  read_on?: Maybe<Date_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
  wishlist?: Maybe<Boolean_Comparison_Exp>;
}

/** unique or primary key constraints on table "shelves" */
export enum Shelves_Constraint {
  /** unique or primary key constraint */
  ShelvesPkey = 'shelves_pkey',
}

/** input type for inserting data into table "shelves" */
export interface Shelves_Insert_Input {
  book?: Maybe<Books_Obj_Rel_Insert_Input>;
  book_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  read?: Maybe<Scalars['Boolean']>;
  read_on?: Maybe<Scalars['date']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
  wishlist?: Maybe<Scalars['Boolean']>;
}

/** aggregate max on columns */
export interface Shelves_Max_Fields {
  __typename?: 'shelves_max_fields';
  book_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  read_on?: Maybe<Scalars['date']>;
  user_id?: Maybe<Scalars['uuid']>;
}

/** order by max() on columns of table "shelves" */
export interface Shelves_Max_Order_By {
  book_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  read_on?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
}

/** aggregate min on columns */
export interface Shelves_Min_Fields {
  __typename?: 'shelves_min_fields';
  book_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  read_on?: Maybe<Scalars['date']>;
  user_id?: Maybe<Scalars['uuid']>;
}

/** order by min() on columns of table "shelves" */
export interface Shelves_Min_Order_By {
  book_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  read_on?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
}

/** response of any mutation on the table "shelves" */
export interface Shelves_Mutation_Response {
  __typename?: 'shelves_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Shelves>;
}

/** input type for inserting object relation for remote table "shelves" */
export interface Shelves_Obj_Rel_Insert_Input {
  data: Shelves_Insert_Input;
  on_conflict?: Maybe<Shelves_On_Conflict>;
}

/** on conflict condition type for table "shelves" */
export interface Shelves_On_Conflict {
  constraint: Shelves_Constraint;
  update_columns: Array<Shelves_Update_Column>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** ordering options when selecting data from "shelves" */
export interface Shelves_Order_By {
  book?: Maybe<Books_Order_By>;
  book_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  read?: Maybe<Order_By>;
  read_on?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  wishlist?: Maybe<Order_By>;
}

/** primary key columns input for table: "shelves" */
export interface Shelves_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "shelves" */
export enum Shelves_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  Id = 'id',
  /** column name */
  Read = 'read',
  /** column name */
  ReadOn = 'read_on',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Wishlist = 'wishlist',
}

/** input type for updating data in table "shelves" */
export interface Shelves_Set_Input {
  book_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  read?: Maybe<Scalars['Boolean']>;
  read_on?: Maybe<Scalars['date']>;
  user_id?: Maybe<Scalars['uuid']>;
  wishlist?: Maybe<Scalars['Boolean']>;
}

/** update columns of table "shelves" */
export enum Shelves_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  Id = 'id',
  /** column name */
  Read = 'read',
  /** column name */
  ReadOn = 'read_on',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Wishlist = 'wishlist',
}

/** subscription root */
export interface Subscription_Root {
  __typename?: 'subscription_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "books" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "shelves" */
  shelves: Array<Shelves>;
  /** fetch aggregated fields from the table: "shelves" */
  shelves_aggregate: Shelves_Aggregate;
  /** fetch data from the table: "shelves" using primary key columns */
  shelves_by_pk?: Maybe<Shelves>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
}

/** subscription root */
export interface Subscription_RootAuthorsArgs {
  distinct_on?: Maybe<Array<Authors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Authors_Order_By>>;
  where?: Maybe<Authors_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootAuthors_AggregateArgs {
  distinct_on?: Maybe<Array<Authors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Authors_Order_By>>;
  where?: Maybe<Authors_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootAuthors_By_PkArgs {
  id: Scalars['uuid'];
}

/** subscription root */
export interface Subscription_RootBooksArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootBooks_AggregateArgs {
  distinct_on?: Maybe<Array<Books_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Books_Order_By>>;
  where?: Maybe<Books_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootBooks_By_PkArgs {
  id: Scalars['uuid'];
}

/** subscription root */
export interface Subscription_RootShelvesArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootShelves_AggregateArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootShelves_By_PkArgs {
  id: Scalars['uuid'];
}

/** subscription root */
export interface Subscription_RootUsersArgs {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootUsers_AggregateArgs {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
}

/** subscription root */
export interface Subscription_RootUsers_By_PkArgs {
  id: Scalars['uuid'];
}

/** columns and relationships of "users" */
export interface Users {
  __typename?: 'users';
  id: Scalars['uuid'];
  /** An array relationship */
  shelves: Array<Shelves>;
  /** An aggregated array relationship */
  shelves_aggregate: Shelves_Aggregate;
  username: Scalars['String'];
}

/** columns and relationships of "users" */
export interface UsersShelvesArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** columns and relationships of "users" */
export interface UsersShelves_AggregateArgs {
  distinct_on?: Maybe<Array<Shelves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shelves_Order_By>>;
  where?: Maybe<Shelves_Bool_Exp>;
}

/** aggregated selection of "users" */
export interface Users_Aggregate {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
}

/** aggregate fields of "users" */
export interface Users_Aggregate_Fields {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
}

/** aggregate fields of "users" */
export interface Users_Aggregate_FieldsCountArgs {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
}

/** order by aggregate values of table "users" */
export interface Users_Aggregate_Order_By {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
}

/** input type for inserting array relation for remote table "users" */
export interface Users_Arr_Rel_Insert_Input {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export interface Users_Bool_Exp {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  shelves?: Maybe<Shelves_Bool_Exp>;
  username?: Maybe<String_Comparison_Exp>;
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "users" */
export interface Users_Insert_Input {
  id?: Maybe<Scalars['uuid']>;
  shelves?: Maybe<Shelves_Arr_Rel_Insert_Input>;
  username?: Maybe<Scalars['String']>;
}

/** aggregate max on columns */
export interface Users_Max_Fields {
  __typename?: 'users_max_fields';
  id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
}

/** order by max() on columns of table "users" */
export interface Users_Max_Order_By {
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
}

/** aggregate min on columns */
export interface Users_Min_Fields {
  __typename?: 'users_min_fields';
  id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
}

/** order by min() on columns of table "users" */
export interface Users_Min_Order_By {
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
}

/** response of any mutation on the table "users" */
export interface Users_Mutation_Response {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
}

/** input type for inserting object relation for remote table "users" */
export interface Users_Obj_Rel_Insert_Input {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
}

/** on conflict condition type for table "users" */
export interface Users_On_Conflict {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
}

/** ordering options when selecting data from "users" */
export interface Users_Order_By {
  id?: Maybe<Order_By>;
  shelves_aggregate?: Maybe<Shelves_Aggregate_Order_By>;
  username?: Maybe<Order_By>;
}

/** primary key columns input for table: "users" */
export interface Users_Pk_Columns_Input {
  id: Scalars['uuid'];
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username',
}

/** input type for updating data in table "users" */
export interface Users_Set_Input {
  id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username',
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export interface Uuid_Comparison_Exp {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
}

export type InsertAuthorMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type InsertAuthorMutation = { __typename?: 'mutation_root' } & {
  insert_authors_one?: Maybe<{ __typename?: 'authors' } & Pick<Authors, 'id'>>;
};

export type AuthorDetailsFragment = { __typename?: 'authors' } & Pick<Authors, 'id' | 'name'> & {
    books: Array<
      { __typename?: 'books' } & Pick<Books, 'id' | 'title' | 'pages' | 'genre' | 'description' | 'image_url'>
    >;
  };

export type GetAuthorsDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthorsDetailsQuery = { __typename?: 'query_root' } & {
  authors: Array<{ __typename?: 'authors' } & AuthorDetailsFragment>;
};

export type SearchForAuthorsQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type SearchForAuthorsQuery = { __typename?: 'query_root' } & {
  authors: Array<{ __typename?: 'authors' } & AuthorDetailsFragment>;
};

export type BookDetailsFragment = { __typename?: 'books' } & Pick<
  Books,
  'id' | 'title' | 'genre' | 'image_url' | 'description'
> & { author: { __typename?: 'authors' } & Pick<Authors, 'id' | 'name'> };

export type GetBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetBooksQuery = { __typename?: 'query_root' } & {
  books: Array<{ __typename?: 'books' } & BookDetailsFragment>;
};

export type SearchForBooksQueryVariables = Exact<{
  title: Scalars['String'];
}>;

export type SearchForBooksQuery = { __typename?: 'query_root' } & {
  books: Array<{ __typename?: 'books' } & BookDetailsFragment>;
};

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthorsQuery = { __typename?: 'query_root' } & {
  authors: Array<{ __typename?: 'authors' } & Pick<Authors, 'id' | 'name'>>;
};

export type InsertBookMutationVariables = Exact<{
  obj: Books_Insert_Input;
}>;

export type InsertBookMutation = { __typename?: 'mutation_root' } & {
  insert_books_one?: Maybe<{ __typename?: 'books' } & Pick<Books, 'id'>>;
};
