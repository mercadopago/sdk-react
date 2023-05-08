import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { FieldName, GenericCallback, GenericEvent, IField, IFieldEvent } from "./types";

export const getInitializationDependencies = (params: any): any => {
  // The following props are commented to avoid re-render 
  const {
    enableLuhnValidation,
    // placeholder,
    customFonts,
    // length,
    // mode,
    group,
    style,
    onValidityChange,
    onBinChange,
    onChange,
    onError,
    onFocus,
    onReady,
    onBlur,
  } = params;

  return [
    enableLuhnValidation,
    customFonts,
    style,
    group,
    onValidityChange,
    onBinChange,
    onChange,
    onError,
    onFocus,
    onReady,
    onBlur,
  ];
};

const getOptions = ({
  enableLuhnValidation,
  customFonts,
  placeholder,
  group,
  style,
}: any): any => {
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

const formatEventName = (eventName: string) => uncapitalizeFirstLetter(eventName.slice(2)) as IFieldEvent;

const registerEvents = (secureFieldInstance: IField, params: any) => {
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