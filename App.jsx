// Disciplina Desenvolvimento de Aplicativos - UnB - CIC - Brasilia - Brasil
// Andrey Emmanuel Matrosov Mazépas - Bruno Ribeiro das Virgens - William Coelho da Silva

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World, DevApps</Text>
      <StatusBar />
    </View>
  );
}
