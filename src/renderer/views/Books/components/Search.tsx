import { Divider, Box, TextField, Theme, Typography, InputAdornment, IconButton } from '@material-ui/core';
import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: { marginTop: theme.spacing(1.75), width: '100%' },
    input: {
      minWidth: '280px',
    },
  }),
);

interface Props {
  onSearch: Function;
  clear: Function;
  children: React.ReactNode;
  placeholder: string;
}

export const Search = ({ onSearch, clear: clearInput, children, placeholder }: Props) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, watch } = useForm();
  function onSubmit(d: any, e: any) {
    onSearch(d.search);
  }

  function clear() {
    setValue('search', '');
    clearInput();
  }
  const searchFiled = watch('search');

  React.useEffect(() => {
    if (searchFiled === '') {
      clearInput();
    }
  }, [searchFiled]);
  return (
    <Box mb={3} display="flex" flexWrap="wrap" justifyContent="space-between">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          name="search"
          inputRef={register}
          classes={{ root: classes.input }}
          {...(searchFiled
            ? {
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="clear search" onClick={clear}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }
            : {})}
        />
      </form>
      <Box display="flex">{children}</Box>
      <Divider className={classes.divider} />
    </Box>
  );
};
