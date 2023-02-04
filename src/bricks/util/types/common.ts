export interface IPayerIdentification {
  type: string;
  number: string;
}

export interface IBrickError {
  type: 'non_critical' | 'critical';
  cause: string;
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
  create: (param: string, param2: string, settings: {}) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export interface IBrickStyle<CustomVariablesType> {
  theme?: 'default' | 'dark' | 'flat' | 'bootstrap'
  customVariables?: CustomVariablesType
}


export interface IBrickVisual<TextsType, StyleType> {
  font?: string;
  texts?: TextsType;
  style?: StyleType;
}

export interface IBrickCustomVariables {
  textPrimaryColor?: string
  textSecondaryColor?: string
  inputBackgroundColor?: string
  formBackgroundColor?: string
  baseColor?: string
  baseColorFirstVariant?: string
  baseColorSecondVariant?: string
  errorColor?: string
  successColor?: string
  outlinePrimaryColor?: string
  outlineSecondaryColor?: string
  buttonTextColor?: string
  fontSizeExtraSmall?: string
  fontSizeSmall?: string
  fontSizeMedium?: string
  fontSizeLarge?: string
  fontSizeExtraLarge?: string
  fontWeightNormal?: string
  fontWeightSemiBold?: string
  formInputsTextTransform?: string
  inputVerticalPadding?: string
  inputHorizontalPadding?: string
  inputFocusedBoxShadow?: string
  inputErrorFocusedBoxShadow?: string
  inputBorderWidth?: string
  inputFocusedBorderWidth?: string
  borderRadiusSmall?: string
  borderRadiusMedium?: string
  borderRadiusLarge?: string
  borderRadiusFull?: string
  formPadding?: string
}