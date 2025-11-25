import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  currentStep: number; // 1 o 2
  onBackPress: () => void;
}

export default function Stepper({ currentStep, onBackPress }: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: currentStep === 1 ? 0.5 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={require("@/assets/icons/button-circle-icon.png")}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Paso + barra */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>PASO {currentStep} DE 2</Text>

        <View style={styles.progressBackground}>
          <Animated.View style={[styles.progressBar, { width }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  stepContainer: {
    flex: 1,
    marginLeft: 16,
  },

  stepText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#333",
    marginBottom: 4,
  },

  progressBackground: {
    height: 6,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#4A3AFF",
    borderRadius: 20,
  },
});
