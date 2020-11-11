import { Grid, Card, CardContent, Box, Typography, Theme } from '@material-ui/core';
import * as React from 'react';
import { BookDetailsFragment } from 'src/renderer/generated/graphql';
import { makeStyles, createStyles } from '@material-ui/styles';

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

interface Props {
  books: BookDetailsFragment[];
}

export function BooksList({ books }: Props) {
  const classes = useStyles();
  return (
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
                      by {book.author?.name}
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
  );
}
