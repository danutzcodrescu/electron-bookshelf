import { Box, Button, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useInsertAuthor } from './queries/mutations';

export const NewAuthor = () => {
  const { handleSubmit, register } = useForm();
  const [mutate, { isSuccess }] = useInsertAuthor();
  const history = useHistory();
  function createNewAuthor(d: any) {
    mutate(d.name);
  }
  React.useEffect(() => {
    if (isSuccess) {
      history.push('/authors');
    }
  }, [isSuccess]);
  return (
    <>
      <Typography gutterBottom variant="h4">
        Create a new author
      </Typography>
      <form onSubmit={handleSubmit(createNewAuthor)}>
        <TextField inputRef={register} name="name" placeholder="name" aria-label="author's name" />
        <Box clone mt={1.5} ml={2}>
          <Button color="primary" type="submit">
            Create new author
          </Button>
        </Box>
      </form>
    </>
  );
};
