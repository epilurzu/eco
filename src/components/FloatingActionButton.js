import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ListIcon from '@material-ui/icons/List';
import colors, { SECONDARY } from './../styles/colors';

const useStyles = makeStyles((theme) => ({
  style: {
    position: "fixed",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(16),
    backgroundColor: SECONDARY,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtonSize() {
  const classes = useStyles();

  return (
    <Fab variant="extended" color="primary" aria-label="table" className={classes.style}>
        <ListIcon className={classes.extendedIcon} />
        TABLE
    </Fab>
  );
}
