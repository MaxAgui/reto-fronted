import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import DocumentInput from "./DocumentInput";
import PhoneInput from "./PhoneInput";

interface Props {
  formData: any;
  errors: any;
  loading: boolean;
  documentMaxLength: number;
  onInputChange: (name: string, value: string | boolean) => void;
  onSubmit: () => void;
}

export default function CotizarForm({
  formData,
  errors,
  loading,
  documentMaxLength,
  onInputChange,
  onSubmit,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ marginTop: 24 }}>

      <DocumentInput
        formData={formData}
        documentMaxLength={documentMaxLength}
        errors={errors}
        onInputChange={onInputChange}
      />

      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <PhoneInput
          value={formData.phoneNumber}
          onChangeText={(text) => onInputChange("phoneNumber", text)}
          error={errors.phoneNumber}
        />
        {errors.phoneNumber ? (
          <Text style={styles.errorMsg}>{errors.phoneNumber}</Text>
        ) : null}
      </View>

      <Pressable
        onPress={() =>
          onInputChange(
            "acceptPrivacyPolicy",
            !formData.acceptPrivacyPolicy
          )
        }
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            formData.acceptPrivacyPolicy && styles.checkboxChecked,
          ]}
        >
          {formData.acceptPrivacyPolicy && (
            <Image
              source={require("@/assets/icons/check-white.png")}
              style={styles.checkIcon}
            />
          )}
        </View>
        <Text style={styles.checkboxLabel}>
          Acepto la Política de Privacidad
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          onInputChange(
            "acceptCommercialCommunications",
            !formData.acceptCommercialCommunications
          )
        }
        style={[styles.checkboxRow, { marginTop: 12 }]}
      >
        <View
          style={[
            styles.checkbox,
            formData.acceptCommercialCommunications && styles.checkboxChecked,
          ]}
        >
          {formData.acceptCommercialCommunications && (
            <Image
              source={require("@/assets/icons/check-white.png")}
              style={styles.checkIcon}
            />
          )}
        </View>
        <Text style={styles.checkboxLabel}>
          Acepto la Política Comunicaciones Comerciales
        </Text>
      </Pressable>

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
