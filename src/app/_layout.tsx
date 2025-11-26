import { useFonts } from "expo-font";
import { Slot, SplashScreen, usePathname } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const pathname = usePathname();
  const isCotizarPage = pathname?.includes('/cotizar');

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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[{ flex: 1 }, styles.container]}>
          {/* Blur superior solo en cotizar */}
          {isCotizarPage && (
            <Image 
              source={require('@/assets/images/blur-asset1.png')} 
              style={styles.blurAssetTopRight}
            />
          )}
          
          <Header />
          <Slot/>
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafbff"
  },
  blurAssetTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    zIndex: 0,
  },
})