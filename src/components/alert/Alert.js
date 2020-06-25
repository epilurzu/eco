import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { remote } from 'electron';
import fs from 'fs';

export default function AlertDialog({ corridor, onUploadCorridor }) {
  const [open, setOpen] = React.useState(corridor == null);

  const handleClose = () => {
    setOpen(false);
  };

  const uploadFile = () => {
    remote.dialog.showOpenDialog(

    ).then(result => {
      let filePath = result.filePaths[0];
      let data = fs.readFileSync(filePath);
      data = new TextDecoder().decode(data);
      data = JSON.parse(data);
      onUploadCorridor(data);
    }).catch(error => {
      console.error(error);
    });

    handleClose();
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
          <Button onClick={uploadFile} color="primary">
            Open
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
