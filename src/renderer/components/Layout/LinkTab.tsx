import * as React from 'react';
import { Theme, Link as MaterialLink } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children: string;
  icon: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.65rem',
      textAlign: 'center',
      marginTop: theme.spacing(2),
      '&:first-of-type': {
        marginTop: 0,
      },
    },
  }),
);

export const LinkTab = ({ to, children, icon }: Props) => {
  const classes = useStyles();
  return (
    <MaterialLink component={Link} to={to} className={classes.links}>
      <span>{icon}</span>
      <span>{children}</span>
    </MaterialLink>
  );
};
