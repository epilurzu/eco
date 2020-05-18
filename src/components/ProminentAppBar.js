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
import colors, { PRIMARY, BLACK, GRAY_DARK, GRAY_MEDIUM } from './../styles/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: GRAY_DARK,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: PRIMARY,
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    marginBottom: theme.spacing(3),
    color: GRAY_DARK,
  },
}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}></div>
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
    </div>
  );
}
