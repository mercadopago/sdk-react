import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { CardNumberEvents, TCardNumberParams } from "../cardNumber/types";
import type { FieldName, GenericCallback, IField, IFieldEvent } from "./types";

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
};

const secureFieldEvents = [
  'onValidityChange',
  'onBinChange',
  'onChange',
  'onError',
  'onFocus',
  'onReady',
  'onBlur',
];

const uncapitalizeFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

const registerEvents = (secureFieldInstance: IField, params: TCardNumberParams) => {
  const keys = Object.keys(params);
  for (const key of keys) {
    if (secureFieldEvents.includes(key)) {
      const eventName = key.slice(2);
      const event = uncapitalizeFirstLetter(eventName) as IFieldEvent;

      const callback = params[key as keyof CardNumberEvents] as GenericCallback;
      secureFieldInstance.on(event, callback);
    }
  }
};

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