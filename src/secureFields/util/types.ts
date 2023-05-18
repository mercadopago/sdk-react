import type { CardNumberEvents, CardNumberUpdatableSettings, CardNumberOptions } from "../cardNumber/types";
import type { ExpirationDateOptions } from "../expirationDate/types";
import type { ExpirationMonthOptions } from "../expirationMonth/types";
import type { ExpirationYearOptions } from "../expirationYear/types";
import type { SecurityCodeOptions, SecurityCodeEvents, SecurityCodeUpdatableSettings } from "../securityCode/types";

export type FieldStyle = {
  color?: string;
  "font-family"?: string;
  fontFamily?: string;
  "font-size"?: string;
  fontSize?: string;
  "font-style"?: string;
  fontStyle?: string;
  "font-variant"?: string;
  fontVariant?: string;
  "font-weight"?: string;
  fontWeight?: string;
  height?: string;
  margin?: string;
  "margin-bottom"?: string;
  marginBottom?: string;
  "margin-left"?: string;
  marginLeft?: string;
  "margin-right"?: string;
  marginRight?: string;
  "margin-top"?: string;
  marginTop?: string;
  padding?: string;
  "padding-bottom"?: string;
  paddingBottom?: string;
  "padding-left"?: string;
  paddingLeft?: string;
  "padding-right"?: string;
  paddingRight?: string;
  "padding-top"?: string;
  paddingTop?: string;
  "placeholder-color"?: string;
  placeholderColor?: string;
  "text-align"?: string;
  textAlign?: string;
  width?: string;
};

export type CustomFonts = {
  /** URL from where to load the custom font */
  src: string;
};

export type BaseFieldsOptions = {
  /**
   * Defines input placeholder.	
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#params-2 Placeholder}.
   */
  placeholder?: string;
  /**
   * Defines field styles with keys named as CSS property
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#style Style}.
   */
  style?: FieldStyle;
  /**
   * Custom Fonts is an array with src attribute defining an url from where to load a custom font.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#custom-fonts Custom Fonts}.
   */
  customFonts?: CustomFonts[];
};

export interface DateYearFieldsOptions extends BaseFieldsOptions {
  /** 
   * For 'short' year must have two digits, for 'full' year must have four digits.
   * 
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#year-mode Year mode}.
   * */
  mode?: ExpirationYearMode;
}

export type FieldName =
  | 'cardNumber'
  | 'securityCode'
  | 'expirationMonth'
  | 'expirationYear'
  | 'expirationDate';

export type FieldsOptions<T> =
  T extends 'cardNumber'      ? CardNumberOptions      : 
  T extends 'securityCode'    ? SecurityCodeOptions    :
  T extends 'expirationMonth' ? ExpirationMonthOptions :
  T extends 'expirationYear'  ? ExpirationYearOptions  :
  T extends 'expirationDate'  ? ExpirationDateOptions  :
  never;

export type FieldEvent = 
  | 'blur' 
  | 'focus'
  | 'change'
  | 'ready'
  | 'validityChange'
  | 'error'
  | 'binChange'
  | 'paste';

export type FieldsUpdatableProperties = {
  style?: FieldStyle;
  placeholder?: string;
  settings?: SecurityCodeUpdatableSettings | CardNumberUpdatableSettings;
};

export type DefaultArg = {
  /** Field name where the event happened */
  field: string;
};

export interface ErrorArg extends DefaultArg {
  error: string;
}

export interface BinChangeArg extends DefaultArg {
  /** First four to six digits of the payment card */
  bin?: string;
}

export type InvalidType = 'invalid_type';
export type InvalidLength = 'invalid_length';
export type InvalidValue = 'invalid_value';

export type CardNumberCause = InvalidType | InvalidLength;
export type SecurityCodeCause = CardNumberCause;
export type ExpirationMonthCause = InvalidType | InvalidValue;
export type ExpirationYearCause = ExpirationMonthCause | CardNumberCause;
export type ExpirationDateCause = ExpirationYearCause;

export type ErrorMessage<FieldName> = {
  /** Detailed error message */
  message: string;
  /** Error cause */
  cause:
    FieldName extends 'cardNumber'      ? CardNumberCause     :
    FieldName extends 'securityCode'    ? SecurityCodeCause   :
    FieldName extends 'expirationMonth' ? ExpirationDateCause :
    FieldName extends 'expirationYear'  ? ExpirationYearCause :
    FieldName extends 'expirationDate'  ? ExpirationDateCause :
    never;
}

export interface ValidityChangeArg<FieldName> extends DefaultArg {
  errorMessages: ErrorMessage<FieldName>[];
}

export type CallbackArgs<EventName, FieldName> =
  EventName extends 'blur'           ? DefaultArg :
  EventName extends 'focus'          ? DefaultArg :
  EventName extends 'ready'          ? DefaultArg :
  EventName extends 'change'         ? DefaultArg :
  EventName extends 'validityChange' ? ValidityChangeArg<FieldName> :
  EventName extends 'error'          ? ErrorArg :
  // TODO: 'paste' arg
  // EventName extends 'paste'          ? number :
  EventName extends 'binChange'      ? BinChangeArg :
  DefaultArg;

export interface Field {
  /** 
   * Field mounting method
   * 
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#field-instancemountcontainer mount} 
   */
  mount: (container: string) => void;
  /** 
   * Field unmounting method 
   * 
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#field-instanceunmount unmount} documentation 
   */
  unmount: () => void;
  /** 
   * Method to add event listeners to field
   * 
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#field-instanceonevent-callback on} documentation 
   */
  on: <EventName extends FieldEvent>(
    event: EventName,
    callback: (args: CallbackArgs<EventName, FieldName>) => void,
  ) => void;
  update: (properties: FieldsUpdatableProperties) => void;
  /** Set focus on the input */
  focus: () => void;
  /** Blur the input */
  blur: () => void;
}

export interface BaseEvents {
  /** Triggered when blur event occurs */
  onBlur?: (arg: DefaultArg) => void;

  /** Triggered when focus event occurs */
  onFocus?: (arg: DefaultArg) => void;

  /** Triggered when field has been initialized */
  onReady?: (arg: DefaultArg) => void;

  /** Triggered when field value changes */
  onChange?: (arg: DefaultArg) => void;

  /** Triggered when error event occurs */
  onError?: (arg: ErrorArg) => void;

  /** Triggered when field validation occurs */
  onValidityChange?: (arg: ValidityChangeArg<FieldName>) => void;
}

export type ExpirationYearMode = 'short' | 'full';

export type GenericCallback = (args: BinChangeArg | DefaultArg | ErrorArg | ValidityChangeArg<FieldName>) => void
export type GenericEvent = CardNumberEvents | SecurityCodeEvents;
