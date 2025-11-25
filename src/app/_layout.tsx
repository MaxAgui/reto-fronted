import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header />

        <Stack
          screenOptions={{
            headerShown: false, // Ocultamos el header nativo
            contentStyle: { backgroundColor: "white" }
          }}
        />
      </SafeAreaView>
    </AuthProvider>
  );
}