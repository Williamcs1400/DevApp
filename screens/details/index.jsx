import I18n from "i18n-js";
import React from "react";
import { View, Text, useColorScheme } from "react-native";

const DetailsScreen = () => {
  const colourScheme = useColorScheme();
  const isDarkMode = colourScheme === "dark";
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode ? "black" : "white",
      }}
    >
      <Text style={{ color: isDarkMode ? "white" : "black" }}>
        {I18n.t("details")} {colourScheme}
      </Text>
    </View>
  );
};

export default DetailsScreen;
