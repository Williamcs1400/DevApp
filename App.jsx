import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import I18n from "i18n-js";
import { en, pt } from "./translations";
import DetailsScreen from "./screens/details";

I18n.translations = {
  en,
  pt,
};

I18n.locale = "pt";
I18n.fallbacks = true;

function HomeScreen({ navigation }) {
  const [lang, setLang] = useState("pt");

  const switchLang = () => {
    setLang(lang === "pt" ? "en" : "pt");
    I18n.locale = lang;
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{I18n.t("home")}</Text>
      <Button
        title={I18n.t("goToDetails")}
        onPress={() => navigation.navigate("Details")}
      />
      <Button title={lang} onPress={switchLang} />
    </View>
  );
}

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
