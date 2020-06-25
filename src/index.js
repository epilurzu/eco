import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import App from './components/App'
import './assets/css/index.css';
//import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
//render(<App />, document.getElementById('root'))



const theme = createMuiTheme({
  palette: {
    primary: teal
  }
});

//TODO: check this colors
/*
export const WHITE = '#FFFFFF';
export const BLACK = '#000000';

export const PRIMARY = WHITE;
export const SECONDARY = '#00897B';
export const SECONDARY_LIGHT = '#4EBAAA';

// ACTIONS
export const SUCCESS = '#3adb76';
export const WARNING = '#ffae00';
export const ALERT = '#cc4b37';

// GRAYSCALE
export const GRAY_LIGHT = '#e6e6e6';
export const GRAY_MEDIUM = '#cacaca';
export const GRAY_DARK = '#5f6368';*/




ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
