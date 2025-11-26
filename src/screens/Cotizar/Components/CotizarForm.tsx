import { CotizarFormData } from "@/src/types/form.types";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ControlledDocumentInput from "./ControlledDocumentInput";
import ControlledPhoneInput from "./ControlledPhoneInput";

interface Props {
  control: Control<CotizarFormData>;
  errors: FieldErrors<CotizarFormData>;
  loading: boolean;
  documentMaxLength: number;
  onDocumentTypeChange: (value: "DNI" | "RUC") => void;
  onSubmit: () => void;
}

export default function CotizarForm({
  control,
  errors,
  loading,
  documentMaxLength,
  onDocumentTypeChange,
  onSubmit,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ marginTop: 24 }}>

      <ControlledDocumentInput
        control={control}
        errors={errors}
        documentMaxLength={documentMaxLength}
        onDocumentTypeChange={onDocumentTypeChange}
      />

      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <ControlledPhoneInput
          control={control}
          errors={errors}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>

      <View style={styles.checkboxContainer}>
        <Controller
          control={control}
          name="acceptPrivacyPolicy"
          rules={{ required: "Acepta la Política de Privacidad" }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => onChange(!value)}
            >
              <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                {value && (
                  <Image
                    source={require("@/assets/images/check.png")}
                    style={styles.checkIcon}
                  />
                )}
              </View>
              <Text style={styles.checkboxText}>
                Acepto la Política de Privacidad
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Controller
          control={control}
          name="acceptCommercialCommunications"
          rules={{ required: "Acepta la Política de Comunicaciones Comerciales" }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => onChange(!value)}
            >
              <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                {value && (
                  <Image
                    source={require("@/assets/images/check.png")}
                    style={styles.checkIcon}
                  />
                )}
              </View>
              <Text style={styles.checkboxText}>
                Acepto la Política de Comunicaciones Comerciales
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{ marginTop: 16 }}
      >
        <Text style={styles.link}>
          Aplican Términos y Condiciones.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cotizando..." : "Cotiza aquí"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                Términos y Condiciones
              </Text>

              <Text style={styles.modalText}>
                Al continuar, declaras que la información proporcionada es verdadera y autorizas el uso de tus datos para evaluar y gestionar la solicitud del servicio. Aceptas nuestras Políticas de Privacidad, así como los términos y condiciones aplicables.
              </Text>

              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  selectBox: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  selectOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  selectOptionActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  selectOptionText: {
    color: "#555",
  },
  selectOptionTextActive: {
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
  },
  inputError: {
    borderColor: "#E53935",
  },
  errorMsg: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 4,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#0A051E",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: "#000",
  },

  checkboxContainer: {
    marginBottom: 16,
  },

  checkboxText: {
    fontSize: 12,
    color: "#0A051E",
    fontFamily: "br-sonoma-medium",
    flex: 1,
  },

  errorText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 4,
  },

  checkboxLabel: {
    fontSize: 12,
    color: "#0A051E",
    fontFamily: "br-sonoma-medium",
  },

  checkIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },

  link: {
    fontSize: 12,
    color: "#03050F",
    textDecorationLine: "underline",
    fontFamily: "br-sonoma-bold",
  },

  button: {
    marginTop: 36,
    backgroundColor: "#03050F",
    paddingVertical: 14,
    borderRadius: 40,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "br-sonoma-bold",
    fontSize: 18,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});
