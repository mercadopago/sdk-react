import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { CardNumberEvents, TCardNumberParams } from "../cardNumber/types";
import type { FieldName, GenericCallback, IField, IFieldEvent } from "./types";

export const getInitializationDependencies = (params: TCardNumberParams): any => {
  // The following props are commented to avoid re-render 
  const {
    enableLuhnValidation,
    // placeholder,
    customFonts,
    // length,
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

const formatEventName = (eventName: string) => uncapitalizeFirstLetter(eventName.slice(2)) as IFieldEvent;

const registerEvents = (secureFieldInstance: IField, params: TCardNumberParams) => {
  const keys = Object.keys(params);
  for (const key of keys) {
    if (secureFieldEvents.includes(key)) {
      const event = formatEventName(key);
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