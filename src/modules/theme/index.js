import { createTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';

const baseTheme = {
  palette,
  typography 
};

export const theme = createTheme(baseTheme);
 