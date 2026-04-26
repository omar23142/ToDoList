import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({open, handleClose, message}) {
  // console.log('snackbarssssss', open)
  if (message ===null)
    return;

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={2000} 
      onClose={handleClose}
     >
        <Alert
        //   onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}!
        </Alert>
      </Snackbar>
    </div>
  );
}
