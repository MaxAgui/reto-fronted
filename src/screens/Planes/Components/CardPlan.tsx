import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardPlanProps {
  id: string;
  title: string;
  description: string;
  icon: any;
  isSelected: boolean;
  onPress: () => void;
}

export default function CardPlan({ 
  id, 
  title, 
  description, 
  icon, 
  isSelected, 
  onPress 
}: CardPlanProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={onPress}
    >
      {/* Selector en esquina superior derecha */}
      <View
        style={[
          styles.selector,
          isSelected && styles.selectorSelected,
        ]}
      >
        {isSelected && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}
      </View>

      {/* Contenido de la tarjeta */}
      <View style={styles.content}>
        {/* Fila: Icono + Título */}
        <View style={styles.titleRow}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Descripción debajo */}
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 336,
    height: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 0,
    marginBottom: 32,
    marginHorizontal: 8,
    position: "relative",
    // Box shadow
    shadowColor: "#AEACF3",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  cardSelected: {
    borderWidth: 3,
    borderColor: "#141938",
  },

  selector: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A9AFD9",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  selectorSelected: {
    borderWidth: 0,
    backgroundColor: "#389E0D",
  },

  content: {
    flex: 1,
    padding: 24,
    paddingRight: 60, // Espacio para el selector
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#141938",
    flex: 1,
  },

  description: {
    fontSize: 12,
    color: "#141938",
    lineHeight: 20,
    fontWeight: "400",
  },
});
