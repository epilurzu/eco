import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ corridor, onUploadCorridor }) {
    const [open, setOpen] = React.useState(corridor == null);

    const handleClose = () => {
        setOpen(false);
    };

    const uploadFile = () => {

        function onChange(event) {
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(event.target.files[0]);
        }

        function onReaderLoad(event) {
            var geojson = JSON.parse(event.target.result);
            onUploadCorridor(geojson);
        }

        document.getElementById('inputFile').addEventListener('change', onChange);
        document.getElementById('inputFile').click();

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
                    <input id="inputFile" type="file" accept="application/JSON" hidden />
                    <Button onClick={uploadFile} color="primary">
                        Open
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
