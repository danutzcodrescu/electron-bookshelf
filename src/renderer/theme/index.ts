import { amber, deepPurple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber,
  },
  overrides: {
    MuiLink: {
      root: {
        color: 'white',
      },
      // @ts-ignore
      text: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: deepPurple[300],
        '&:hover': { backgroundColor: deepPurple[500] },
      },
      containedSecondary: {
        backgroundColor: amber[700],
        '&:hover': { backgroundColor: amber[900] },
      },
    },
    MuiTypography: {
      h1: {
        fontSize: '2.3rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
    },
    MuiInput: {
      underline: {
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid ${deepPurple[800]}`,
        },
      },
    },
    MuiPaper: {
      root: {
        padding: defaultTheme.spacing(3),
      },
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
    MuiTextField: {
      variant: 'outlined',
      InputLabelProps: {
        disableAnimation: true,
      },
    },
  },
});
