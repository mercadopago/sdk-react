export interface IPayerIdentification {
  /**
   * Identification type which possible values vary based on siteId.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Payer data} documentation.
   */
  type: string;
  /**
   * Identification number which if filled correctly the Brick will prefill the identification number input.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Payer data} documentation.
   */
  number: string;
}

export interface IBrickError {
  /**
   * Error type.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Payer data} documentation.
   */
  type: 'non_critical' | 'critical';
  /**
   * Error cause.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Payer data} documentation.
   */
  cause: string;
  /**
   * Error message.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Payer data} documentation.
   */
  message: string;
}

export interface IBrickCallbacks {
  /**
   *  Callback called when Brick is ready. Here you can hide loadings from your site, for example.
   */
  onReady?: () => void;
  /**
   * Callback called for all Brick error cases.
   *
   * @param error - A {@link IBrickError} objects
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/possible-errors Possible errors} documentation.
   */
  onError?: (error: IBrickError) => void;
}

export interface IBrickBinCallback {
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-data additional data customization} documentation.
   */
  onBinChange?: (bin: string) => void;
}

export interface IBrickSettings extends IBrickCallbacks, IBrickBinCallback {}

export type BricksBuilderType = {
  /**
   * Method to create bricks.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/common-initialization Common initialization} documentation.
   */
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  /**
   * Specify bricks at Mercado Pago type instance .
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/common-initialization Common initialization} documentation.
   */
  bricks: () => BricksBuilderType;
};

export interface IBrickStyle<CustomVariablesType> {
  /**
   * Defines theme for Brick. Possible values: default, dark, flat, bootstrap.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/set-theme General Customization # Set Theme} documentation.
   */
  theme?: 'default' | 'dark' | 'flat' | 'bootstrap';
  /**
   * Defines custom variables to be applied.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  customVariables?: CustomVariablesType;
}

export interface IBrickVisual<TextsType, StyleType> {
  /**
   * Defines custom font URL (applies to the Secure Fields.).
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  font?: string;
  /**
   * Defines custom font URL.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  texts?: TextsType;
  /**
   * Defines custom theme and CSS variables.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  style?: StyleType;
}

/**
 * Bricks custom variables.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
 */
export interface IBrickCustomVariables {
  textPrimaryColor?: string;
  textSecondaryColor?: string;
  inputBackgroundColor?: string;
  formBackgroundColor?: string;
  baseColor?: string;
  baseColorFirstVariant?: string;
  baseColorSecondVariant?: string;
  errorColor?: string;
  successColor?: string;
  outlinePrimaryColor?: string;
  outlineSecondaryColor?: string;
  buttonTextColor?: string;
  fontSizeExtraSmall?: string;
  fontSizeSmall?: string;
  fontSizeMedium?: string;
  fontSizeLarge?: string;
  fontSizeExtraLarge?: string;
  fontWeightNormal?: string;
  fontWeightSemiBold?: string;
  formInputsTextTransform?: string;
  inputVerticalPadding?: string;
  inputHorizontalPadding?: string;
  inputFocusedBoxShadow?: string;
  inputErrorFocusedBoxShadow?: string;
  inputBorderWidth?: string;
  inputFocusedBorderWidth?: string;
  borderRadiusSmall?: string;
  borderRadiusMedium?: string;
  borderRadiusLarge?: string;
  borderRadiusFull?: string;
  formPadding?: string;
}
