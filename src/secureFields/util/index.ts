import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import { TCardNumberParams } from "../cardNumber/types";
import type { FieldName, IField } from "./types";

const getOptions = ({
  enableLuhnValidation,
  customFonts,
  placeholder,
  group,
  style,
}: TCardNumberParams): object => {
  return {
    enableLuhnValidation,
    customFonts,
    placeholder,
    group,
    style,
  }
}

const registerEvents = (cardNumberInstance: IField, params: TCardNumberParams) => {
  
}

export const initSecureField = async (fieldName: FieldName, params: TCardNumberParams) => {
  const options = getOptions(params);
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  const secureFieldInstance = instanceMercadoPago?.fields.create(fieldName, options)

  if (secureFieldInstance) {
    secureFieldInstance.mount(`${fieldName}SecureField_container`);
    registerEvents(secureFieldInstance, params);
  }

  return secureFieldInstance;
};