import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CotizarForm from "./Components/CotizarForm";

export default function Cotizar() {
  const [formData, setFormData] = useState({
    documentType: "DNI",
    documentNumber: "",
    phoneNumber: "",
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  });

  const [errors, setErrors] = useState({
    document: "",
    phoneNumber: "",
    acceptPrivacyPolicy: "",
    acceptCommercialCommunications: "",
  });

  const [documentMaxLength, setDocumentMaxLength] = useState(8);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    let newErrors = { ...errors };

    newErrors[name] = "";

    if (name === "documentType") {
      setDocumentMaxLength(value === "DNI" ? 8 : 11);
      setFormData({
        ...formData,
        documentType: value,
        documentNumber: "",
      });
      return;
    }

    if (name === "documentNumber") {
      if (
        (formData.documentType === "DNI" && value.length !== 8) ||
        (formData.documentType === "RUC" && value.length !== 11)
      ) {
        newErrors.document = "Número de documento inválido";
      } else {
        newErrors.document = "";
      }
    }

    if (name === "phoneNumber") {
      if (!value || value.length < 9) {
        newErrors.phoneNumber = "Ingresa un número válido";
      } else {
        newErrors.phoneNumber = "";
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(newErrors);
  };

  const { login } = useAuth();

  const onSubmit = async () => {
    setLoading(true);

    setTimeout(async () => {
      if (
        errors.document ||
        errors.phoneNumber ||
        !formData.acceptPrivacyPolicy
      ) {
        setLoading(false);
        alert("Corrige los errores antes de continuar.");
        return;
      }
      
      try {
        await login(formData.documentNumber);
        router.push("/(protected)/planes");
      } catch (error) {
        console.error('Error durante el login:', error);
        alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Seguro Salud Flexible</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>Creado para ti y tu familia</Text>
          </View>
        </View>

        <Image
          source={require("@/assets/images/familia.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.subtitle}>
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
          asesoría. 100% online.
        </Text>

        <CotizarForm
          formData={formData}
          errors={errors}
          loading={loading}
          documentMaxLength={documentMaxLength}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
        />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
  },

  left: {
    flex: 1,
  },

  tag: {
    backgroundColor: "#EDEAF2",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  tagText: {
    color: "#4D4D4D",
    fontWeight: "600",
    fontSize: 12,
  },

  info: {
    marginTop: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#666666",
    maxWidth: "90%",
  },

  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
});
