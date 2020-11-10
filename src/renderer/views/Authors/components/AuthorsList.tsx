import * as React from 'react';
import { Box, Card, CardContent, Divider, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { AuthorDetailsFragment } from '../../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      width: '100%',
      marginTop: theme.spacing(0.75),
    },
    bookTitle: {
      fontSize: '0.8rem',
      fontWeight: 600,
    },
    title: {
      fontSize: '1.25rem',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1.5),
    },
  }),
);

interface Props {
  authors: AuthorDetailsFragment[];
}

export const AuthorsList = ({ authors }: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {authors.map((author) => (
        <Grid item key={author.id} xs={6} lg={4}>
          <Card>
            <CardContent>
              <Typography component="h2" className={classes.title}>
                {author.name}'s books
              </Typography>

              {author.books.map((book, index, array) => (
                <Box key={book.id} display="flex" mb={1} flexWrap="wrap">
                  <Box
                    component="img"
                    // @ts-ignore
                    src={book.image_url || 'https://via.placeholder.com/80x120.png?text=No+image+available'}
                    width="40px"
                    height="auto"
                    object-fit="cover"
                    mr={1.5}
                  />
                  <Typography className={classes.bookTitle}>{book.title}</Typography>
                  {index !== array.length - 1 ? <Divider className={classes.divider} /> : null}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
