import * as React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useBooks } from './queries/queries';

interface Props {}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const Books = (props: Props) => {
  const classes = useStyles();
  const { status, data, error, isFetching } = useBooks();
  console.log(status, data, error, isFetching);
  return <div>test</div>;
};
