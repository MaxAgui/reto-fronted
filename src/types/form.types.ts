export interface CotizarFormData {
  documentType: "DNI" | "RUC";
  documentNumber: string;
  phoneNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialCommunications: boolean;
}
