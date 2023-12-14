export type TBrand = {
  /**
   * Optional. An object containing customization options.
   */
  customization?: IBrandCustomization;
  /**
   * Optional. Function. Receives function to be executed just after brick rendered
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/default-rendering Card Payment Brick # Default rendering} documentation.
   */
  onReady?: () => void;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
}

export interface IBrandCustomization {
  text?: IBrandText;
  visual?: IBrandVisual;
  paymentMethods?: IBrandPaymentMethodCustomization;
}

export interface IBrandText {
  valueProp?: BrandValueProps;
  useCustomFont?: boolean;
  size?: BrandTextSizes;
  fontWeight?: BrandFontWeight;
  color?: BrandTextColor;
  align?: BrandAlignment;
}

type BrandValueProps =
  | 'installments'
  | 'payment_methods'
  | 'security'
  | 'payment_methods_logos'
  | 'credits';

type BrandTextSizes = 'extra_small' | 'small' | 'medium' | 'large';

type BrandFontWeight = 'regular' | 'semibold';

type BrandTextColor = 'primary' | 'secondary' | 'inverted';

type BrandAlignment = 'left' | 'center' | 'right';

export interface IBrandVisual {
  hideMercadoPagoLogo?: boolean;
  contentAlign?: BrandAlignment;
  backgroundColor?: BrandBackgroundColor;
  border?: boolean;
  borderColor?: BrandBorderColor;
  borderWidth?: string;
  borderRadius?: string;
  verticalPadding?: string;
  horizontalPadding?: string;
}

type BrandBackgroundColor =
  | 'white'
  | 'mercado_pago_primary'
  | 'mercado_pago_secondary'
  | 'black'
  | 'transparent';

type BrandBorderColor = 'dark' | 'light';

export interface IBrandPaymentMethodCustomization {
  excludedPaymentMethods?: TBrandPaymentMethods[];
  excludedPaymentTypes?: TBrandPaymentTypes[];
  maxInstallments?: number;
  interestFreeInstallments?: boolean;
}

type TBrandPaymentMethods =
  | 'master'
  | 'visa'
  | 'amex'
  | 'naranja'
  | 'maestro'
  | 'cabal'
  | 'cencosud'
  | 'cordobesa'
  | 'argencard'
  | 'diners'
  | 'tarshop'
  | 'cmr'
  | 'rapipago'
  | 'pagofacil'
  | 'mercadopago';

type TBrandPaymentTypes =
  | 'credit_card'
  | 'debit_card'
  | 'ticket'
  | 'account_money'
  | 'mercado_credito';
