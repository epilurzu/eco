import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({flag}) {
  const [open, setOpen] = React.useState(flag);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please upload a file to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Open
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
