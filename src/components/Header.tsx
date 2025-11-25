import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo_rimac.png")}
        style={styles.logo}
      />

      <TouchableOpacity
        style={styles.phoneButton}
        onPress={() => {
        }}
      >
        <Image
          source={require("@/assets/icons/icon-phone.png")}
          style={styles.phoneIcon}
        />

        <Text style={styles.phoneText}>
          (01) 411 6001
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 65.05,
    height: 32,
    resizeMode: "contain",
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  phoneText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "700",
  },
});
