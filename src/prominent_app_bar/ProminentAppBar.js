import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import FloatingActionButton from './FloatingActionButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: "white",
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    marginBottom: theme.spacing(3),
    color: "grey",
  },
}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}></Toolbar>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Map
          </Typography>
          <IconButton className={classes.icon} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton className={classes.icon} aria-label="display more actions" edge="end">
            <MoreIcon />
          </IconButton>
        </Toolbar>
        <FloatingActionButton/>
      </AppBar>
    </React.Fragment>
  );
}
