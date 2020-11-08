import * as React from 'react';
import { Box, TextField, Theme, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { USER_ID } from '../../../constants';

export const Welcome = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  function userIdSubmit(d: any) {
    localStorage.setItem(USER_ID, d.userId);
    history.push('/');
  }

  return (
    <Box display="flex" height="100vh" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" gutterBottom>
        Hello! Welcome to your bookshelf!📚📚📚
      </Typography>
      <Box my={2} clone>
        <Typography variant="h4" align="center">
          We first need to know who you are 😜!
        </Typography>
      </Box>
      <Box clone my={2} id="usernameId">
        <Typography variant="h4" align="center">
          What's your username?
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(userIdSubmit)}>
        <TextField
          variant="filled"
          InputProps={{ disableUnderline: true }}
          inputRef={register}
          name="userId"
          aria-labelledby="usernameId"
        />
      </form>
    </Box>
  );
};
