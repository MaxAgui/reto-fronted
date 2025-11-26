import { useAuth } from "@/src/context/AuthContext";
import { CotizarFormData } from "@/src/types/form.types";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CotizarForm from "./Components/CotizarForm";

export default function Cotizar() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CotizarFormData>({
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      phoneNumber: "",
      acceptPrivacyPolicy: false,
      acceptCommercialCommunications: false,
    },
    mode: "onChange"
  });

  const documentType = watch("documentType");
  const documentMaxLength = documentType === "DNI" ? 8 : 11;

  const onSubmit = async (data: CotizarFormData) => {
    setLoading(true);

    try {
      await login(data.documentNumber, data.phoneNumber, data.documentType);
      router.push("/(protected)/planes");
    } catch (error) {
      console.error('Error durante el login:', error);
      Alert.alert("Error", "Error al iniciar sesión. Por favor, intenta nuevamente.", [{ text: "Reintentar" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentTypeChange = (value: "DNI" | "RUC") => {
    setValue("documentType", value);
    setValue("documentNumber", ""); // Reset document number when type changes
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
          control={control}
          errors={errors}
          loading={loading}
          documentMaxLength={documentMaxLength}
          onDocumentTypeChange={handleDocumentTypeChange}
          onSubmit={handleSubmit(onSubmit)}
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
