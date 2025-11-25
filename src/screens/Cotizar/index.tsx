import { useAuth } from "@/src/context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
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

    // Validar campos vacíos y errores
    const validationErrors = [];

    // Validar documento
    if (!formData.documentNumber || formData.documentNumber.trim() === "") {
      validationErrors.push("• Ingresa tu número de documento");
    } else if (errors.document) {
      validationErrors.push("• Corrige el número de documento");
    }

    // Validar celular
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      validationErrors.push("• Ingresa tu número de celular");
    } else if (errors.phoneNumber) {
      validationErrors.push("• Corrige el número de celular");
    }

    // Validar políticas
    if (!formData.acceptPrivacyPolicy) {
      validationErrors.push("• Acepta la Política de Privacidad");
    }

    if (!formData.acceptCommercialCommunications) {
      validationErrors.push("• Acepta la Política de Comunicaciones Comerciales");
    }

    // Si hay errores, mostrar mensaje claro
    if (validationErrors.length > 0) {
      setLoading(false);
      const errorMessage = "Para continuar debes completar:\n\n" + validationErrors.join("\n");
      alert(errorMessage);
      return;
    }

    try {
      await login(formData.documentNumber, formData.phoneNumber, formData.documentType);
      router.push("/(protected)/planes");
    } catch (error) {
      console.error('Error durante el login:', error);
      alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <LinearGradient
            colors={['#00F4E2', '#00FF7F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tag}
          >
            <Text style={styles.tagText}>Seguro Salud Flexible</Text>
          </LinearGradient>

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
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  tagText: {
    color: "#03050F",
    fontFamily: "br-sonoma-bold",
    fontSize: 12,
  },

  info: {
    marginTop: 8,
    marginRight: 12,
  },

  title: {
    fontSize: 28,
    fontFamily: "br-sonoma-bold",
    color: "#03050F",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#03050F",
    maxWidth: "90%",
    fontFamily: "br-sonoma-bold",
  },

  headerImage: {
    width: 136,
    height: 160,
    borderRadius: 16,
  },
});
