import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const main = '#1EA4CE';
const siyah = '#000000';
const BasketBackground='#147594'
const gray="6F6F6F";

const palette=  {
  primary: {
    contrastText: '#FFFFFF',
    dark: main,
    main: main,
    light: BasketBackground
  },
  secondary: {
    contrastText: "#FFFFFF",
    dark: main,
    main: main,
    light: main,
    white:white
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: siyah,
    secondary: main,
    light:gray,
    link: colors.blue[600]
  },
  link: main,
  icon: main,
  background: {
    default: '#E5E5E5',
    paper: white
  },
  divider: colors.grey[200]
};


export default palette;