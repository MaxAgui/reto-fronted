import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

      <Text style={styles.label}>Tipo de documento</Text>
      <View style={styles.selectBox}>
        {["DNI", "RUC"].map((item) => (
          <Pressable
            key={item}
            onPress={() => onInputChange("documentType", item)}
            style={[
              styles.selectOption,
              formData.documentType === item && styles.selectOptionActive,
            ]}
          >
            <Text
              style={[
                styles.selectOptionText,
                formData.documentType === item && styles.selectOptionTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Nro. de documento</Text>
      <TextInput
        style={[styles.input, errors.document && styles.inputError]}
        placeholder="Ingresa tu número"
        keyboardType="numeric"
        maxLength={documentMaxLength}
        value={formData.documentNumber}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "");
          onInputChange("documentNumber", clean);
        }}
      />
      {errors.document ? (
        <Text style={styles.errorMsg}>{errors.document}</Text>
      ) : null}

      <Text style={[styles.label, { marginTop: 16 }]}>Celular</Text>
      <TextInput
        style={[styles.input, errors.phoneNumber && styles.inputError]}
        placeholder="Ingresa tu celular"
        keyboardType="phone-pad"
        maxLength={9}
        value={formData.phoneNumber}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "");
          onInputChange("phoneNumber", clean);
        }}
      />
      {errors.phoneNumber ? (
        <Text style={styles.errorMsg}>{errors.phoneNumber}</Text>
      ) : null}

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
        />
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
        />
        <Text style={styles.checkboxLabel}>
          Acepto la Política Comunicaciones Comerciales
        </Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{ marginTop: 12 }}
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
                Aplican Términos y Condiciones
              </Text>

              <Text style={styles.modalText}>
                Encontrarás información importante sobre tus derechos y
                obligaciones al utilizar nuestros servicios...
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
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },

  link: {
    fontSize: 12,
    color: "#333",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  button: {
    marginTop: 24,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
