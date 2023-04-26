export type IFieldStyle = {
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

export type ICustomFonts = {
  /** URL from where to load the custom font */
  src: string;
};

export type TBaseFieldsOptions = {
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
  style?: IFieldStyle;
  /**
   * Custom Fonts is an array with src attribute defining an url from where to load a custom font.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#custom-fonts Custom Fonts}.
   */
  customFonts?: ICustomFonts[];
  group?: string;
};

export interface IDateYearFieldsOptions extends TBaseFieldsOptions {
  /** 
   * For 'short' year must have two digits, for 'full' year must have four digits.
   * 
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#year-mode Year mode}.
   * */
  mode?: 'short' | 'full'
}

export interface ICardNumberOptions extends TBaseFieldsOptions {
  enableLuhnValidation?: boolean;  
}
export interface ISecurityCodeOptions extends TBaseFieldsOptions {}
export interface IExpirationDateOptions extends IDateYearFieldsOptions {}
export interface IExpirationYearOptions extends IDateYearFieldsOptions {}
export interface IExpirationMonthOptions extends TBaseFieldsOptions {}

export type FieldName =
  | 'cardNumber'
  | 'securityCode'
  | 'expirationMonth'
  | 'expirationYear'
  | 'expirationDate';

export type TFieldsOptions<T> =
  T extends 'cardNumber'      ? ICardNumberOptions      : 
  T extends 'securityCode'    ? ISecurityCodeOptions    :
  T extends 'expirationMonth' ? IExpirationMonthOptions :
  T extends 'expirationYear'  ? IExpirationYearOptions  :
  T extends 'expirationDate'  ? IExpirationDateOptions  :
  never;

export type IFieldEvent = 'blur' | 'focus' | 'change' | 'ready' | 'validityChange' | 'error' | 'binChange' | 'paste';

export type SecurityCode = {
  mode: string;
  card_location: string;
  length: number;
};

export type CardNumber = {
  length: number;
  validation: string;
};

export type FieldsUpdatableProperties = {
  style?: IFieldStyle;
  placeholder?: string;
  settings?: SecurityCode | CardNumber;
};

export interface IField {
  mount: (container: string) => void;
  unmount: () => void;
  on: (event: IFieldEvent, callback: (args) => void) => void;
  update: (properties: FieldsUpdatableProperties) => void;
  focus: () => void;
  blur: () => void;
}
