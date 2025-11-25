import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "br-sonoma-black": require("@/assets/fonts/br-sonoma/BRSonoma-Black.otf"),
    "br-sonoma-bold": require("@/assets/fonts/br-sonoma/BRSonoma-Bold.otf"),
    "br-sonoma-light": require("@/assets/fonts/br-sonoma/BRSonoma-Light.otf"),
    "br-sonoma-medium": require("@/assets/fonts/br-sonoma/BRSonoma-Medium.otf"),
    "br-sonoma-regular": require("@/assets/fonts/br-sonoma/BRSonoma-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

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