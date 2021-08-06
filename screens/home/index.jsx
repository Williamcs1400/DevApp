import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import I18n from "i18n-js";

const HomeScreen = ({ navigation }) => {
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
};

export default HomeScreen;
