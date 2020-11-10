/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, CircularProgress, IconButton, Modal, Snackbar, Theme, Typography } from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import { ipcRenderer, shell } from 'electron';
import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab';
import { EXPORT_TO_PDF, EXPORT_TO_PDF_COMPLETED } from '../../../events';
import { AuthorDetailsFragment, BookDetailsFragment } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    loadingContainer: {
      maxWidth: '300px',
      backgroundColor: 'white',
      display: 'flex',
      borderRadius: '7px',
      alignItems: 'center',
      padding: theme.spacing(4, 3),
    },
    paragraph: {
      marginLeft: theme.spacing(3),
      fontWeight: 600,
    },
  }),
);

const duration = 6000;

interface Props {
  data: AuthorDetailsFragment[] | BookDetailsFragment[];
}

export function ExportToPDFIcon({ data }: Props) {
  const classes = useStyles();
  const [isOpen, setModalState] = React.useState<boolean>(false);
  const [details, setDetails] = React.useState<{ path: string; type: 'success' | 'error' } | undefined>(undefined);

  React.useEffect(() => {
    ipcRenderer.on(EXPORT_TO_PDF_COMPLETED, exportCompleted);
    return () => {
      ipcRenderer.off(EXPORT_TO_PDF_COMPLETED, exportCompleted);
    };
  }, []);

  function exportCompleted(_: any, { filePath, status }: { filePath: string; status: 'success' | 'error' }) {
    setModalState(false);
    if (filePath) {
      setDetails({ path: filePath, type: status });
      setTimeout(() => {
        setDetails(undefined);
      }, duration);
    }
  }

  function exportToPDF() {
    setModalState(true);
    ipcRenderer.send(EXPORT_TO_PDF, data);
  }
  return (
    <>
      <IconButton onClick={exportToPDF}>
        <PictureAsPdf />
      </IconButton>
      <Modal aria-label="Creating PDF" open={isOpen} onClose={() => setModalState(false)} className={classes.modal}>
        <div className={classes.loadingContainer}>
          <CircularProgress color="primary" size={30} thickness={5} />{' '}
          <Typography className={classes.paragraph}>Creating PDF</Typography>
        </div>
      </Modal>
      <Snackbar
        open={Boolean(details?.type)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={details?.type === 'success' ? 'PDF created successfully!' : 'There was an error in creating the PDF'}
        {...(details?.path ? { action: <Button onClick={() => shell.openExternal(details.path!)}>Open</Button> } : {})}
      />
    </>
  );
}
