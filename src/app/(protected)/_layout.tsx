import Stepper from "@/src/components/Stepper";
import { router, Slot, usePathname } from "expo-router";
import { View } from "react-native";

export default function PlanesLayout() {
  const pathname = usePathname();

  // Paso equivalente al web:
  const currentStep = pathname.includes("/planes") ? 1 : 2;

  const handleBackPress = async () => {
    if (currentStep === 1) {

      router.push("/"); // volver al home/login
    } else {
      // step 2 → regresar a plans

      router.push("/planes");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stepper currentStep={currentStep} onBackPress={handleBackPress} />

      <Slot/>
    </View>
  );
}
