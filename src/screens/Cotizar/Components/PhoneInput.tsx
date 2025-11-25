import React, { useEffect, useRef, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const animateLabel = (toValue: number) => {
    Animated.timing(labelAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
            color: isFocused ? "#007AFF" : "#888",
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
    borderColor: "#B8BED0",
    borderRadius: 12,
    backgroundColor: "#F9FAFE",
    height: 52,
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
