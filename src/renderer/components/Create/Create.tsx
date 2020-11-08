import * as React from 'react';
import { Link, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { PlusOne } from '@material-ui/icons';

interface Props {
  title: string;
  to: 'books' | 'authors';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export const Create = ({ title, to }: Props) => {
  const classes = useStyles();
  return (
    <Link component={RouterLink} to={`/${to}/new`} className={classes.link}>
      <PlusOne />
      {title}
    </Link>
  );
};
