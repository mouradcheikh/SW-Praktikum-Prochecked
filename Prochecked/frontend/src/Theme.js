import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    black,
    white,
    primary: {
      contrastText: white,
      dark: '#006c78',
      main: '#00b8ba', 
      light: '#96f5ff'
    },
    secondary: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[800],
      light: colors.red['A400']
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[300],
      main: colors.orange[300],
      light: colors.orange[300]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: white,
      secondary: white,
      // link: colors.blue[600]
    },
    background: {
      default: '#F4F6F8',
      paper: colors.grey[900],
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200]
  }, 
});


// A custom theme for this app
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });


export default theme;