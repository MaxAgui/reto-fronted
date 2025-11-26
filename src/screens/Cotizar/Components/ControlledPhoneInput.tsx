import { CotizarFormData } from "@/src/types/form.types";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import PhoneInput from "./PhoneInput";

interface Props {
  control: Control<CotizarFormData>;
  errors: FieldErrors<CotizarFormData>;
}

export default function ControlledPhoneInput({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="phoneNumber"
      rules={{
        required: "Ingresa tu número de celular",
        validate: (value) => {
          if (!value || value.length < 9) {
            return "Ingresa un número válido";
          }
          return true;
        }
      }}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          value={value}
          onChangeText={onChange}
          error={errors.phoneNumber?.message}
        />
      )}
    />
  );
}
