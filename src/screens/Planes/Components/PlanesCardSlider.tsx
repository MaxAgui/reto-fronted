import { PlanItem } from "@/src/api/plans/plans.types";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlanCardSliderProps {
  plans: PlanItem[];
  loading: boolean;
  selectedOption: string;
}

// Mapeo de iconos para cada plan
const planIcons: { [key: string]: any } = {
  "Plan en Casa": require("@/assets/icons/IcHomeLight.png"),
  "Plan en Casa y Clínica": require("@/assets/icons/IcHospitalLight.png"),
  "Plan en Casa + Bienestar": require("@/assets/icons/IcHomeLight.png"),
  "Plan en Casa + Chequeo": require("@/assets/icons/IcHomeLight.png"),
  "Plan en Casa + Fitness": require("@/assets/icons/IcHomeLight.png"),
};

export default function PlanCardSlider({ plans, loading, selectedOption }: PlanCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setSelectedPlan } = useAuth();

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / 300 // ancho de la card
    );
    setCurrentIndex(index);
  };

  const handleSelectPlan = (plan: PlanItem) => {
    setSelectedPlan(plan);
    router.push("/(protected)/resumen");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EB004A" />
        <Text style={styles.loadingText}>Cargando planes...</Text>
      </View>
    );
  }

  if (plans.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No hay planes disponibles</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 32 }}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {plans.map((plan: PlanItem, index: number) => (
          <View key={index} style={styles.card}>
            {/* Title */}
            <View style={styles.headerRow}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Image 
                source={planIcons[plan.name] || require("@/assets/icons/IcHomeLight.png")} 
                style={styles.icon} 
              />
            </View>

            {/* Cost */}
            <Text style={styles.costLabel}>COSTO DEL PLAN</Text>
            <Text style={styles.price}>S/{plan.price.toFixed(2)} al mes</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Description list */}
            <View>
              {plan.description.map((item: string, i: number) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.descText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSelectPlan(plan)}
            >
              <Text style={styles.buttonText}>Seleccionar plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Text style={styles.pageText}>
          {currentIndex + 1} / {plans.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 28,
    marginRight: 20,
    shadowColor: "#2A2A44",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A1A1A",
  },
  icon: {
    width: 36,
    height: 36,
  },
  costLabel: {
    marginTop: 20,
    fontSize: 12,
    color: "#7A7A7A",
    fontWeight: "900",
  },
  price: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "900",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 24,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  bulletIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  descText: {
    flex: 1,
    fontSize: 14,
    color: "#3A3A3A",
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#EB004A",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  pagination: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  pageText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  arrow: {
    width: 22,
    height: 22,
  },
  loadingContainer: {
    marginTop: 32,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
});
