export type IFieldStyle = {
  [key: string]: string;
};

export type ICustomFonts = {
  src: string;
};

export type TBaseFieldsOptions = {
  placeholder?: string;
  style?: IFieldStyle;
  customFonts?: ICustomFonts[];
  group?: string;
};

export interface IDateYearFieldsOptions extends TBaseFieldsOptions {
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
