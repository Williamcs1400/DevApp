/* eslint-disable camelcase */
import React from 'react';
import {LogBox} from 'react-native';
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
  MyAnimalsList,
  Notifications,
  ChatList,
  Chat,
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
  LogBox.ignoreLogs(['Setting a timer']);

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
            screenOptions={{
              headerStyle: {
                backgroundColor: meauTheme(isThemeDark).colors.secondaryOrange,
              },
              headerTitleStyle: {color: meauTheme(isThemeDark).colors.primaryBlack},
            }}
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
              name="MyAnimalsList"
              options={{title: 'Meus animais'}}
              component={MyAnimalsList}
            />
            <Drawer.Screen
              name="AnimalsList"
              options={{title: 'Adotar'}}
              component={AnimalsList}
            />
            <Drawer.Screen
              name="Notifications"
              options={{title: 'Notificações'}}
              component={Notifications}
            />
            <Drawer.Screen
              name="ChatList"
              options={{title: 'Chat'}}
              component={ChatList}
            />
            <Drawer.Screen
              name="Chat"
              options={{title: 'Chat', hidden: true}}
              component={Chat}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
