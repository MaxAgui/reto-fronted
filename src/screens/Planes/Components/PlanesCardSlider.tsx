import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const fakePlans = [
  {
    name: "Plan en Casa",
    price: 39,
    icon: require("@/assets/icons/IcHomeLight.png"),
    description: [
      "Médico general a domicilio por S/20 y medicinas cubiertas al 100%.",
      "Videoconsulta y orientación telefónica al 100% en medicina general + pediatría.",
      "Indemnización de S/300 en caso de hospitalización por más de un día.",
    ],
  },
  {
    name: "Plan en Casa y Clínica",
    price: 59,
    icon: require("@/assets/icons/IcHospitalLight.png"),
    description: [
      "Cobertura en clínicas afiliadas.",
      "Atención de emergencias las 24 horas.",
      "Incluye laboratorio y rayos X.",
    ],
  },
  {
    name: "Plan Premium",
    price: 89,
    icon: require("@/assets/icons/IcHomeLight.png"),
    description: [
      "Atención ilimitada.",
      "Hab. privada en hospitalización.",
      "Cobertura completa + especialistas.",
    ],
  },
];

export default function PlanCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / 300 // ancho de la card
    );
    setCurrentIndex(index);
  };

  return (
    <View style={{ marginTop: 32 }}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {fakePlans.map((plan, index) => (
          <View key={index} style={styles.card}>
            {/* Title */}
            <View style={styles.headerRow}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Image source={plan.icon} style={styles.icon} />
            </View>

            {/* Cost */}
            <Text style={styles.costLabel}>COSTO DEL PLAN</Text>
            <Text style={styles.price}>S/{plan.price} al mes</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Description list */}
            <View>
              {plan.description.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  {/* <Image
                    source={require("@/assets/icons/check-circle.png")}
                    style={styles.bulletIcon}
                  /> */}
                  <Text style={styles.descText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(protected)/resumen")}
            >
              <Text style={styles.buttonText}>Seleccionar plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Text style={styles.pageText}>
          {currentIndex + 1} / {fakePlans.length}
        </Text>

        {/* <TouchableOpacity
          disabled={currentIndex === fakePlans.length - 1}
          onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, fakePlans.length - 1))}
        >
          <Image
            style={styles.arrow}
            source={require("@/assets/icons/arrow-right.png")}
          />
        </TouchableOpacity> */}
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
});
