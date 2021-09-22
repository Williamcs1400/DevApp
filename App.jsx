/* eslint-disable camelcase */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import {
  DetailsScreen,
  HomeScreen,
  Register,
  Login,
  ChangeEntry,
  RegisterAnimalScreen,
  AnimalProfileScreen,
  AnimalsList,
} from './screens';
import {PreferencesContext} from './preferencesContext';
import {CustomDrawer} from './components';

I18n.translations = {
  en,
  pt,
};

I18n.locale = 'en';
I18n.fallbacks = true;

const Drawer = createDrawerNavigator();

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
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawer {...props} />}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
              name="Details"
              component={DetailsScreen}
              options={{hidden: true}}
            />
            <Drawer.Screen name="Login" component={Login} options={{hidden: true}} />
            <Drawer.Screen
              name="Register"
              component={Register}
              options={{hidden: true}}
            />
            <Drawer.Screen
              name="ChangeEntry"
              component={ChangeEntry}
              options={{hidden: true}}
            />
            <Drawer.Screen
              name="RegisterAnimalScreen"
              options={{title: 'Cadastro de animais'}}
              component={RegisterAnimalScreen}
            />
            <Drawer.Screen
              name="AnimalProfileScreen"
              component={AnimalProfileScreen}
              options={{hidden: true}}
            />
            <Drawer.Screen
              name="AnimalsList"
              options={{title: 'Adotar'}}
              component={AnimalsList}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
