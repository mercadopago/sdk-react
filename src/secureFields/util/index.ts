import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { FieldName, GenericCallback, GenericEvent, Field, FieldEvent } from "./types";

export const getInitializationDependencies = (params: any, keysToExclude: string[]): any => {
  const dependencies = [];
  const entries = Object.entries(params);  
  for (const [key, value] of entries) {
    const shouldAdd = !keysToExclude.includes(key);
    shouldAdd && dependencies.push(value);
  }
  return dependencies;
}

const getOptions = ({
  enableLuhnValidation,
  customFonts,
  placeholder,
  group,
  style,
  mode,
}: any): any => {
  return {
    enableLuhnValidation,
    customFonts,
    placeholder,
    group,
    style,
    mode,
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

const formatEventName = (eventName: string) => uncapitalizeFirstLetter(eventName.slice(2)) as FieldEvent;

const registerEvents = (secureFieldInstance: Field, params: any) => {
  const keys = Object.keys(params);
  for (const key of keys) {
    if (secureFieldEvents.includes(key)) {
      const event = formatEventName(key);
      const callback = params[key as keyof GenericEvent] as GenericCallback;
      secureFieldInstance.on(event, callback);
    }
  }
};

export const initSecureField = async (fieldName: FieldName, params: any) => {
  const options = getOptions(params);
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  const secureFieldInstance = instanceMercadoPago?.fields.create(fieldName, options)

  if (secureFieldInstance) {
    secureFieldInstance.mount(`${fieldName}SecureField_container`);
    registerEvents(secureFieldInstance, params);
  }

  return secureFieldInstance;
};