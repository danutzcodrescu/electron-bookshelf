import * as React from 'react';
import { Box, Link as MaterialLink, Theme } from '@material-ui/core';

import { AssignmentTurnedIn, Home, LibraryBooks, Shop } from '@material-ui/icons';
import { LinkTab } from './LinkTab';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Box display="flex" height="100vh">
      <Box
        bgcolor="primary.main"
        color="secondary.main"
        height="100%"
        width="60px"
        display="flex"
        flexDirection="column"
        alignContent="center"
        py={4}
      >
        <LinkTab to="/" icon={<Home />}>
          Home
        </LinkTab>
        <LinkTab to="/read" icon={<AssignmentTurnedIn />}>
          Read
        </LinkTab>
        <LinkTab to="/wishlist" icon={<Shop />}>
          TBR
        </LinkTab>
        <LinkTab to="/books" icon={<LibraryBooks />}>
          Books
        </LinkTab>
      </Box>
      <Box p={3} flex={1}>
        {children}
      </Box>
    </Box>
  );
};
