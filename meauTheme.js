import {configureFonts, DefaultTheme} from 'react-native-paper';
import customFonts from './fonts';

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 30,
  halfOpacity: 0.5,
  quarterOpacity: 0.25,
  colors: {
    ...DefaultTheme.colors,
    primaryOrange: '#F7a800',
    secondaryOrange: '#ffd358',
    terciaryOrange: '#fee29b',
    primaryTeal: '#589b9b',
    secondaryTeal: '#88c9bf',
    terciaryTeal: '#cfe9e5',
    primaryBlack: '#434343',
    secondaryBlack: '#757575',
    terciaryBlack: '#e6e7e8',
    background: '#fafafa',
    accent: '#f1c40f',
    favorite: '#BADA55',
    cancelButton: '#a4c639',
    iconColor: '#808080',
  },
};

export default theme;
