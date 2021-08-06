import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import I18n from 'i18n-js';
import {en, pt} from './translations';
import {DetailsScreen, HomeScreen} from './screens';

I18n.translations = {
  en,
  pt,
};

I18n.locale = 'pt';
I18n.fallbacks = true;

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
