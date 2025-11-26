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
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={require("@/assets/icons/button-circle-icon.png")}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.stepText}>PASO {currentStep} DE 2</Text>

      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressBar, { width }]} />
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
    borderBottomWidth: 1,
    borderBottomColor: "#D7DBF5",
    gap: 16,
  },

  stepText: {
    fontSize: 10,
    fontFamily: "br-sonoma-bold",
    color: "#141938",
  },

  progressBackground: {
    height: 6,
    flex: 1,
    backgroundColor: "#D7DBF5",
    borderRadius: 20,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#4F4FFF",
    borderRadius: 20,
  },
});
