import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo-rimac-white.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.separator} />

      <Text style={styles.copy}>
        © 2023 RIMAC Seguros y Reaseguros.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#03050F",
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 140,
    height: 40,
    marginBottom: 20,
  },

  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "#2B304E",
    marginBottom: 24,
  },

  copy: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "br-sonoma-regular",
  },
});
