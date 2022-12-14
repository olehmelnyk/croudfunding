import { Alert, AlertColor, Snackbar as MUISnackbar } from '@mui/material';
import { useEffect, useState } from 'react';

interface IProps {
  showSnackbar: boolean;
  severity: AlertColor;
  message: string;
}

export const Snackbar = (props: IProps) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    setSnackBarOpen(props.showSnackbar);
  }, [props.showSnackbar]);

  return (
    <MUISnackbar
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackBarOpen(false)}
    >
      <Alert
        onClose={() => setSnackBarOpen(false)}
        severity={props.severity}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
