import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface DocumentInputProps {
  formData: {
    documentType: "DNI" | "RUC";
    documentNumber: string;
  };
  documentMaxLength: number;
  errors: {
    document?: string;
  };
  onInputChange: (name: string, value: string) => void;
}

export default function DocumentInput({
  formData,
  documentMaxLength,
  errors,
  onInputChange,
}: DocumentInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(formData.documentNumber ? 1 : 0)).current;
  
  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "RUC", label: "RUC" }
  ];

  const handleSelectDocumentType = (type: "DNI" | "RUC") => {
    onInputChange("documentType", type);
    setIsDropdownOpen(false);
  };

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
    if (!formData.documentNumber) {
      animateLabel(0);
    }
  };

  useEffect(() => {
    if (formData.documentNumber) {
      animateLabel(1);
    } else {
      animateLabel(0);
    }
  }, [formData.documentNumber]);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, errors.document && styles.errorBorder]}>
        {/* SELECTOR */}
        <Pressable 
          style={styles.selector} 
          onPress={() => setIsDropdownOpen(true)}
        >
          <Text style={styles.selectorText}>{formData.documentType}</Text>
          <Ionicons 
            name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
            size={18} 
            color="#03050F" 
          />
        </Pressable>

        {/* SEPARATOR */}
        <View style={styles.separator} />

        {/* INPUT CONTAINER WITH FLOATING LABEL */}
        <View style={styles.inputContainer}>
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
            Nro. de documento
          </Animated.Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={documentMaxLength}
            value={formData.documentNumber}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9]/g, "");
              onInputChange("documentNumber", clean);
            }}
          />
        </View>
      </View>

      {/* DROPDOWN POSITIONED */}
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {documentTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.dropdownItem,
                formData.documentType === type.value && styles.dropdownItemSelected
              ]}
              onPress={() => handleSelectDocumentType(type.value as "DNI" | "RUC")}
            >
              <Text style={[
                styles.dropdownItemText,
                formData.documentType === type.value && styles.dropdownItemTextSelected
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {/* ERROR MESSAGE */}
      {errors.document && (
        <Text style={styles.errorMsg}>{errors.document}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 1000,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B8BED0",
    borderRadius: 12,
    backgroundColor: "#F9FAFE",
    height: 52,
    overflow: "hidden",
  },

  errorBorder: {
    borderColor: "#FF4D4F",
  },

  selector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
    height: "100%",
  },

  selectorText: {
    fontSize: 16,
    color: "#03050F",
    fontFamily: "br-sonoma-medium",
  },

  separator: {
    width: 1,
    height: "70%",
    backgroundColor: "#B8BED0",
  },

  inputContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
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

  dropdown: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B8BED0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
  },

  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  dropdownItemSelected: {
    backgroundColor: "#F0F8FF",
  },

  dropdownItemText: {
    fontSize: 16,
    color: "#03050F",
    fontFamily: "br-sonoma-medium",
  },

  dropdownItemTextSelected: {
    color: "#007AFF",
    fontFamily: "br-sonoma-bold",
  },

  errorMsg: {
    color: "#FF4D4F",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: "br-sonoma-regular",
  },
});

