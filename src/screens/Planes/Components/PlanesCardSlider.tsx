import { PlanItem } from "@/src/api/plans/plans.types";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
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
  const { setSelectedPlan } = useAuth();

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
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
      >
        {plans.map((plan: PlanItem, index: number) => (
          <View key={index} style={styles.card}>
            {/* Title */}
            <View style={styles.headerRow}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Image
                source={planIcons[plan.name] || require("@/assets/icons/IcHomeLight.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>

            {/* Cost */}
            <Text style={styles.costLabel}>COSTO DEL PLAN</Text>
            <Text style={styles.price}>S/{plan.price.toFixed(2)} al mes</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Description list */}
            <View>
              {plan.description.map((item: string, i: number) => {
                const iconSources = [
                  require("@/assets/icons/GlMedicalAttentionSolid.png"),
                  require("@/assets/icons/GlLaptopSolid.png"),
                  require("@/assets/icons/GlHospitalSolid.png")
                ];
                
                return (
                  <View key={i} style={styles.bulletRow}>
                    {i < 3 && (
                      <Image 
                        source={iconSources[i]} 
                        style={styles.bulletIcon}
                        resizeMode="contain"
                      />
                    )}
                    <Text style={styles.descText}>{item}</Text>
                  </View>
                );
              })}
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
    shadowColor: "#AEACF3",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#141938",
    flexShrink: 1,
    flex: 1,
    marginRight: 12,
  },
  icon: {
    width: 56,
    height: 56,
  },
  costLabel: {
    marginTop: 20,
    fontSize: 12,
    color: "#7981B2",
    fontWeight: "900",
  },
  price: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: "900",
    color: "#141938",
  },
  divider: {
    height: 1,
    backgroundColor: "#D7DBF5",
    marginVertical: 24,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  bulletIcon: {
    width: 20,
    height: 26,
    marginRight: 12,
  },
  descText: {
    flex: 1,
    fontSize: 16,
    color: "#141938",
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 32,
    backgroundColor: "#FF1C44",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
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
