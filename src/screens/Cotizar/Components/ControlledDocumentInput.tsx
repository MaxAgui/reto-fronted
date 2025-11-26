import { CotizarFormData } from "@/src/types/form.types";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DocumentInput from "./DocumentInput";

interface Props {
  control: Control<CotizarFormData>;
  errors: FieldErrors<CotizarFormData>;
  documentMaxLength: number;
  onDocumentTypeChange: (value: "DNI" | "RUC") => void;
}

export default function ControlledDocumentInput({
  control,
  errors,
  documentMaxLength,
  onDocumentTypeChange,
}: Props) {
  return (
    <>
      <Controller
        control={control}
        name="documentType"
        render={({ field: { value } }) => (
          <Controller
            control={control}
            name="documentNumber"
            rules={{
              required: "Ingresa tu número de documento",
              validate: (value) => {
                if (!value) return "Ingresa tu número de documento";
                if (value.length !== documentMaxLength) {
                  return "Número de documento inválido";
                }
                return true;
              }
            }}
            render={({ field: { onChange, value: docNumber } }) => (
              <DocumentInput
                formData={{
                  documentType: value,
                  documentNumber: docNumber
                }}
                documentMaxLength={documentMaxLength}
                errors={{
                  document: errors.documentNumber?.message
                }}
                onInputChange={(name: string, inputValue: string | boolean) => {
                  if (name === "documentType") {
                    onDocumentTypeChange(inputValue as "DNI" | "RUC");
                  } else if (name === "documentNumber") {
                    onChange(inputValue);
                  }
                }}
              />
            )}
          />
        )}
      />
    </>
  );
}
