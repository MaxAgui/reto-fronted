import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  View
} from "react-native";

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export default function PhoneInput({ value, onChangeText, error }: PhoneInputProps) {
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const animateLabel = (toValue: number) => {
    Animated.timing(labelAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    animateLabel(1);
  };

  const handleBlur = () => {
    if (!value) {
      animateLabel(0);
    }
  };

  useEffect(() => {
    if (value) {
      animateLabel(1);
    } else {
      animateLabel(0);
    }
  }, [value]);

  return (
    <View style={[styles.container, error && styles.errorBorder]}>
      <Animated.Text
        style={[
          styles.floatingLabel,
          {
            top: labelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 4],
            }),
            fontSize: labelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: "#5E6488",
          },
        ]}
      >
        Celular
      </Animated.Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={9}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "");
          onChangeText(clean);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#5E6488",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
  },

  errorBorder: {
    borderColor: "#FF4D4F",
  },

  input: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: 16,
    color: "#03050F",
    fontFamily: "br-sonoma-regular",
  },

  floatingLabel: {
    position: "absolute",
    left: 12,
    fontFamily: "br-sonoma-regular",
    backgroundColor: "transparent",
  },

  errorMsg: {
    color: "#FF4D4F",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: "br-sonoma-regular",
  },
});
