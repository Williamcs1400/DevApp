/* eslint-disable camelcase */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import I18n from 'i18n-js';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import meauTheme from './meauTheme';
import {en, pt} from './translations';
import {DetailsScreen, HomeScreen, RegisterAnimalScreen} from './screens';
import {PreferencesContext} from './preferencesContext';

I18n.translations = {
  en,
  pt,
};

I18n.locale = 'en';
I18n.fallbacks = true;

const Stack = createNativeStackNavigator();

function App() {
  useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const toggleTheme = React.useCallback(
    () => setIsThemeDark(!isThemeDark),
    [isThemeDark],
  );

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={meauTheme(isThemeDark)}>
        <NavigationContainer theme={meauTheme(isThemeDark)}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="RegisterAnimalScreen" component={RegisterAnimalScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
