import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlanCardSlider from "./Components/PlanesCardSlider";

export default function Planes() {
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleSelect = (value: string) => {
    setSelectedOption(value);

  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} contentContainerStyle={{ padding: 20 }}>
      {/* TITULO */}
      <Text style={styles.title}>Rocío ¿Para quién deseas cotizar?</Text>

      {/* SUBTÍTULO */}
      <Text style={styles.subtitle}>
        Selecciona la opción que se ajuste más a tus necesidades.
      </Text>

      {/* OPCIONES */}
      <View style={{ marginTop: 24 }}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.card,
              selectedOption === opt.id && styles.cardSelected,
            ]}
            onPress={() => handleSelect(opt.id)}
          >
            {/* Icono */}
            <Image source={opt.icon} style={styles.icon} />

            {/* Info */}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{opt.title}</Text>
              <Text style={styles.cardDescription}>{opt.description}</Text>
            </View>

            {/* Radio */}
            <View
              style={[
                styles.radio,
                selectedOption === opt.id && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>


      <PlanCardSlider/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: "#626262",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E6E6",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSelected: {
    borderColor: "#4A3AFF",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A1A1A",
  },
  cardDescription: {
    marginTop: 6,
    fontSize: 13,
    color: "#5A5A5A",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D5D5D5",
  },
  radioSelected: {
    borderColor: "#4A3AFF",
    backgroundColor: "#4A3AFF",
  },
});
