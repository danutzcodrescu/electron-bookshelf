import * as React from 'react';
import { Box, Button, Grid, MenuItem, TextField, Theme } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useGetAuthors, useInsertBook } from './queries/queries';

export const NewBook = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      author: 'author',
      genre: 'genre',
    },
  });
  const { data, isFetching } = useGetAuthors();
  const [mutate, { isSuccess }] = useInsertBook();
  const history = useHistory();
  function createNewBook(d: any) {
    mutate({
      title: d.title,
      author_id: d.author,
      description: d.description,
      genre: d.genre,
      image_url: d.image_url,
      pages: d.pages,
    });
  }
  React.useEffect(() => {
    if (isSuccess) {
      history.push('/books');
    }
  }, [isSuccess]);
  return (
    <form onSubmit={handleSubmit(createNewBook)}>
      <Grid container spacing={2}>
        <Grid item xs={7} lg={5}>
          <TextField aria-label="title" inputRef={register} name="title" placeholder="Title" fullWidth />
        </Grid>

        <Grid item xs={4} lg={5}>
          {!isFetching ? (
            <Controller
              control={control}
              name="author"
              render={({ ref, onBlur, onChange, name, value }) => (
                <TextField
                  select
                  placeholder="Author"
                  inputRef={ref}
                  aria-label="author"
                  fullWidth
                  onBlur={onBlur}
                  onChange={onChange}
                  name={name}
                  value={value}
                >
                  <MenuItem disabled value="author">
                    Author
                  </MenuItem>
                  {data!.map((elem: any) => (
                    <MenuItem key={elem.id} value={elem.id}>
                      {elem.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          ) : null}
        </Grid>
        <Grid item xs={7} lg={5}>
          <TextField
            aria-label="description"
            multiline
            inputRef={register}
            name="description"
            placeholder="Description"
            fullWidth
          />
        </Grid>
        <Grid item xs={5} lg={3}>
          <TextField aria-label="image url" name="image_url" inputRef={register} placeholder="Image URL" fullWidth />
        </Grid>
        <Grid item xs={2} lg={1}>
          <TextField type="number" aria-label="pages" name="pages" inputRef={register} placeholder="Pages" />
        </Grid>
        <Grid item xs={2} lg={1}>
          <Controller
            control={control}
            name="genre"
            render={({ onChange, onBlur, value, ref, name }) => (
              <TextField
                aria-label="genre"
                inputRef={ref}
                select
                placeholder="Genre"
                fullWidth
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              >
                <MenuItem disabled value="genre">
                  Genre
                </MenuItem>
                <MenuItem value="sci-fi">sci-fi</MenuItem>
                <MenuItem value="fantasy">fantasy</MenuItem>
                <MenuItem value="thriller">thriller</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <Box clone mt={1.5}>
        <Button color="primary" type="submit">
          Create new book
        </Button>
      </Box>
    </form>
  );
};
