import { plansService } from "@/src/api/plans/plans.service";
import { PlanItem } from "@/src/api/plans/plans.types";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CardPlan from "./Components/CardPlan";
import PlanCardSlider from "./Components/PlanesCardSlider";

export default function Planes() {
  const [selectedOption, setSelectedOption] = useState("");
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const { user } = useAuth();

  const options = [
    {
      id: "para-mi",
      title: "Para mí",
      description: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
      icon: require("@/assets/icons/IcProtectionLight.png"),
    },
    {
      id: "para-alguien-mas",
      title: "Para alguien más",
      description: "Realiza una cotización para uno de tus familiares o cualquier persona.",
      icon: require("@/assets/icons/IcAddUserLight.png"),
    },
  ];

  const loadPlans = async (selectedOption: string) => {
    setLoadingPlans(true);
    try {
      const response = await plansService.getPlans();

      const processedPlans = response.list.map(plan => ({
        ...plan,
        price: selectedOption === "para-alguien-mas"
          ? parseFloat((plan.price * 0.95).toFixed(2))
          : plan.price
      }));

      setPlans(processedPlans);
    } catch (error) {
      console.error('Error al cargar planes:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    // Cargar planes cuando se selecciona una opción
    loadPlans(value);
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
      {/* TITULO */}
      <Text style={styles.title}>{user?.name ?? ''} ¿Para quién deseas cotizar?</Text>

      {/* SUBTÍTULO */}
      <Text style={styles.subtitle}>
        Selecciona la opción que se ajuste más a tus necesidades.
      </Text>

      {/* OPCIONES */}
      <View style={{ marginTop: 16, alignItems: "center", paddingHorizontal: 20 }}>
        {options.map((opt) => (
          <CardPlan
            key={opt.id}
            id={opt.id}
            title={opt.title}
            description={opt.description}
            icon={opt.icon}
            isSelected={selectedOption === opt.id}
            onPress={() => handleSelect(opt.id)}
          />
        ))}
      </View>

      {/* PLAN CARD SLIDER - Solo se muestra si hay una opción seleccionada */}
      {selectedOption && (
        <View>
          <PlanCardSlider
            plans={plans}
            loading={loadingPlans}
            selectedOption={selectedOption}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#141938",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "400",
    color: "#141938",
  },
});
