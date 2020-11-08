import * as React from 'react';
import { Card, CardContent, Box, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Create } from 'components/Create/Create';
import { BookDetailsFragment } from '../../generated/graphql';
import { useBooks, useSearchForBooks } from './queries/queries';
import { Search } from './components/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      marginTop: theme.spacing(2),
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3,
      overflow: 'hidden',
    },
    rootCard: {
      minHeight: '240px',
    },
  }),
);

export const Books = () => {
  const classes = useStyles();
  const [books, setBooks] = React.useState<BookDetailsFragment[]>([]);
  const { data, error, isFetching } = useBooks();
  const [mutate, { data: searchResults, isLoading, error: searchError }] = useSearchForBooks();

  function reset() {
    setBooks(data || []);
  }

  React.useEffect(() => {
    setBooks(data || []);
  }, [data]);

  React.useEffect(() => {
    if (searchResults) {
      setBooks(searchResults || []);
    }
  }, [searchResults]);

  return (
    <>
      <Search onSearch={mutate} clear={reset} placeholder="Search for books">
        <Create to="books" title="New book" />
      </Search>
      {isLoading || isFetching ? <p>loading</p> : null}
      {!isFetching && !isLoading ? (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item key={book.id} xs={6} lg={4} xl={3}>
              <Card classes={{ root: classes.rootCard }}>
                <CardContent>
                  <Box display="flex">
                    <Box
                      component="img"
                      // @ts-ignore
                      src={book.image_url || 'https://via.placeholder.com/80x120.png?text=No+image+available'}
                      width="80px"
                      height="auto"
                      object-fit="cover"
                      mr={1.5}
                    />
                    <Box>
                      <Box clone component="h2" fontSize="1.25rem">
                        <Typography>{book.title}</Typography>
                      </Box>
                      <Box clone component="span" fontSize="0.9rem">
                        <Typography component="span" color="textSecondary">
                          by {book.author.name}
                        </Typography>
                      </Box>

                      <Typography className={classes.description}>{book.description}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </>
  );
};
