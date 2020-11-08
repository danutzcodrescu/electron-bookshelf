import * as React from 'react';
import { Box, Theme } from '@material-ui/core';
import { AssignmentTurnedIn, Create, Home, LibraryBooks, Shop } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/styles';
import { LinkTab } from './LinkTab';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflowY: 'auto',
    },
  }),
);

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Box display="flex" height="100vh" width="100%">
      <Box
        bgcolor="primary.main"
        color="secondary.main"
        height="100%"
        width="60px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        py={4}
        position="fixed"
      >
        <LinkTab to="/books" icon={<LibraryBooks />}>
          Books
        </LinkTab>
        <LinkTab to="/authors" icon={<Create />}>
          Authors
        </LinkTab>
      </Box>
      <Box p={3} flex={1} className={classes.container} marginLeft="60px">
        {children}
      </Box>
    </Box>
  );
};
