import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={require("../../assets/images/logo_rimac.png")}
        style={{ width: 100, height: 30, resizeMode: "contain" }}
      />

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
        }}
      >
        <Image
          source={require("../../assets/icons/icon-phone.png")}
          style={{ width: 100, height: 30, resizeMode: "contain" }}
        />

        <Text style={{ marginLeft: 6, fontSize: 16, fontWeight: "600" }}>
          (01) 411 6001
        </Text>
      </TouchableOpacity>
    </View>
  );
}
