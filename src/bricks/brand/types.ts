export type TBrand = {
  /**
   * Optional. An object containing customization options.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  customization?: IBrandCustomization;
  /**
   * Optional. Function. Receives function to be executed just after brick rendered.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/callbacksBrand Brick # Callbacks} documentation.
   */
  onReady?: () => void;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
};

export interface IBrandCustomization {
  /**
   * Optional. Brand Brick offers some text customizations, such as: {align, valueProp, useCustomFont, size, fontWeight, color}
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  text?: IBrandText;
  /**
   * Optional. Brand Brick offers some visual customizations, such as: {hideMercadoPagoLogo, contentAlign, backgroundColor, border, borderColor, borderWidth, borderRadius, verticalPadding, horizontalPadding}
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  visual?: IBrandVisual;
  /**
   * Optional. Brand Brick offers some payment methods customizations, as: {excludedPaymentMethods, excludedPaymentTypes, maxInstallments, interestFreeInstallments}
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/payment-methods Brick # Payment methods} documentation.
   */
  paymentMethods?: IBrandPaymentMethodCustomization;
}

export interface IBrandText {
  /**
   * Optional. There are four value propositions available that configure the content and can allow for certain customizations.
   * {'installments', 'payment_methods', 'security', 'payment_methods_logos', 'credits'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/default-rendering Brick # Value prop} documentation.
   */
  valueProp?: BrandValueProps;
  /**
   * Optional. It starts false, but if it changes to true, Brick inherits the parent's font.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  useCustomFont?: boolean;
  /**
   * Optional. Changes the font size to one of the options provided.
   * {'extra_small', 'small', 'medium', 'large'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  size?: BrandTextSizes;
  /**
   * Optional. Changes the font weight to one of the options provided.
   * {'regular', 'semibold'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  fontWeight?: BrandFontWeight;
  /**
   * Optional. Changes the font color to one of the options provided. Pay attention to the color contrast with the background color and allow the user to read the text.
   * {'primary', 'secondary', 'inverted'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  color?: BrandTextColor;
  /**
   * Optional. Changes the text alignment to one of the options provided.
   * {'left', 'center', 'right'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
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
  /**
   * Optional. Hides the Mercado Pago logo from the banner.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  hideMercadoPagoLogo?: boolean;
  /**
   * Optional. Changes all the content alignment (text and logos, when the value prop applied have it) inside banner to one of the options provided.
   * {'left', 'center', 'right'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  contentAlign?: BrandAlignment;
  /**
   * Optional. Changes banner background color to one of the options provided. Pay attention to the color contrast with the background color and allow the user to read the text.
   * {'white', 'mercado_pago_primary', 'mercado_pago_secondary', 'black', 'transparent'}.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  backgroundColor?: BrandBackgroundColor;
  /**
   * Optional. Enable border around banner.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  border?: boolean;
  /**
   * Optional. Changes banner border color to 'dark' or 'light'.
   * {'dark', 'light'}
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  borderColor?: BrandBorderColor;
  /**
   * Optional. Changes banner border width to 1px or 2px.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  borderWidth?: string;
  /**
   * Optional. Change the roundness of the banner border.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  borderRadius?: string;
  /**
   * Optional. Changes the vertical padding inside banner until 40px.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
  verticalPadding?: string;
  /**
   * Optional. Changes the horizontal padding inside banner until 40px.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/visual-customizations Brick # Visual customizations} documentation.
   */
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
  /**
   * Optional. Specify the payment methods you don't want to show.
   * ['master', 'visa', 'amex', 'naranja', 'maestro', 'cabal', 'cencosud', 'cordobesa', 'argencard', 'diners', 'tarshop', 'cmr', 'rapipago', 'pagofacil', 'mercadopago']
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/payment-methods Brick # Payment methods} documentation.
   */
  excludedPaymentMethods?: TBrandPaymentMethods[];
  /**
   * Optional. Specify the payment types you don't want to show.
   * ['credit_card', 'debit_card', 'ticket', 'account_money', 'mercado_credito'].
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/payment-methods Brick # Payment methods} documentation.
   */
  excludedPaymentTypes?: TBrandPaymentTypes[];
  /**
   * Optional. Add an installment limit.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/payment-methods Brick # Payment methods} documentation.
   */
  maxInstallments?: number;
  /**
   * Optional. If true, the installments will be presented interest-free.
   *
   * @see {@link https://mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/settings/payment-methods Brick # Payment methods} documentation.
   */
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
