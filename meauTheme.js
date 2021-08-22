import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import customFonts from './fonts';

const customThemeColors = {
  primaryOrange: '#F7a800',
  secondaryOrange: '#ffd358',
  terciaryOrange: '#fee29b',
  primaryTeal: '#589b9b',
  secondaryTeal: '#88c9bf',
  terciaryTeal: '#cfe9e5',
  primaryBlack: '#434343',
  secondaryBlack: '#757575',
  terciaryBlack: '#e6e7e8',
  iconColor: '#808080',
};

const customThemeDarkColors = {
  primaryOrange: '#F7a800',
  secondaryOrange: '#ffd358',
  terciaryOrange: '#fee29b',
  primaryTeal: '#589b9b',
  secondaryTeal: '#88c9bf',
  terciaryTeal: '#cfe9e5',
  primaryBlack: '#434343',
  secondaryBlack: '#757575',
  terciaryBlack: '#e6e7e8',
  accent: '#f1c40f',
  favorite: '#BADA55',
  cancelButton: '#a4c639',
  iconColor: '#808080',
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...customThemeColors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...customThemeDarkColors,
  },
};

const theme = (isDarkTheme) => {
  const defaultTheme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  return {
    ...defaultTheme,
    fonts: configureFonts(customFonts),
    roundness: 30,
    halfOpacity: 0.5,
    quarterOpacity: 0.25,
    colors: {
      ...defaultTheme.colors,
    },
  };
};

export default theme;
