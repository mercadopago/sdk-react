import { IBrickSettings } from '../util/types/common';

export interface IWalletBrickVisual {
  /**
   * Optional. Customizing the button background. Default: 'default'. Options: default, black, blue, white.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  buttonBackground?: 'default' | 'black' | 'blue' | 'white';
  /**
   * Optional. Customizing the button height. Default: '48px'. Minimum: 48px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  buttonHeight?: string;
  /**
   * Optional. Customizing the button border-radius. Default: 6px.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  borderRadius?: string;
  /**
   * Optional. Customizing the button vertical padding. Default: grey. Options grey or white.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  valuePropColor?: 'grey' | 'white';
  /**
   * Optional. Customizing the button vertical padding. Default: '16px'. Minimum: 16px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  verticalPadding?: string;
  /**
   * Optional. Customizing the butto horizontal padding. Default: '0px'. Minimum: 0px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  horizontalPadding?: string;
  /**
   * Optional. Property that allows hiding the value proposition text (below the button). Default: false.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  hideValueProp?: boolean;
}

export interface IWalletBrickTexts {
  /**
   * Optional. Initial text of Wallet Brick that will be concatenated with `with Mercado Pago`. Default: 'pay'
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-texts Wallet Brick# Additional Settings # Change Texts} documentation.
   */
  action?: 'pay' | 'buy';
  /**
   * Optional. Text that will be rendered below the Wallet button
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-texts Wallet Brick# Additional Settings # Change Texts} documentation.
   */
  valueProp?: 'practicality' | 'convenience' | 'security_details' | 'security_safety';
}

export interface IWalletBrickCustomization {
  /**
   * Optional. Wallet Brick offers two reading levels: the call to action (button) and the value proposition.
   * In both cases, the text can be customized according to the options provided by Mercado Pago.
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-texts Wallet Brick# Additional Settings # Change Texts} documentation.
   */
  texts?: IWalletBrickTexts;
  /**
   * Optional. Wallet Brick offers some levels of visual customization:
   * {buttonBackground, buttonHeight, borderRadius, valuePropColor, verticalPadding, horizontalPadding}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  visual?: IWalletBrickVisual;
  /**
   * Optional. Wallet Brick offers some customization over the Checkout Experience.
   *
   */
  checkout?: IWalletBrickCheckoutCustomization;
}

interface IWalletBrickCheckoutCustomization {
  /**
   * Optional. Wallet Brick offers two optional customizable theme variables that receive hexadecimal values:
   * {elementsColor, headerColor}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-pro/checkout-customization/user-interface/color-style Checkout Theme customization} documentation.
   */
  theme?: {
    elementsColor?: string;
    headerColor?: string;
  };
}

export interface PreferenceOnSubmit extends IBrickSettings {
  /**
   * Optional. An object containing initialization options.
   */
  initialization?: {
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example modal. Default 'self'
     *
     * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/opening-mode#editor_2 Redirect Mode} documentation.
     * */
    redirectMode?: 'modal' | 'blank' | 'self';
  };
  /**
   * Optional. An object containing customization options.
   */
  customization?: IWalletBrickCustomization;
  onSubmit: () => Promise<unknown>;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
}

export interface PreferenceOnInitialization extends IBrickSettings {
  /**
   * Non-optional. An object containing initialization options.
   */
  initialization: {
    /**
     * Non-optional. Autogenerated unique ID that identifies the preference. For example 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @tutorial {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
     * */
    preferenceId: string;
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example modal. Default 'self'
     *
     * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/opening-mode#editor_2 Redirect Mode} documentation.
     * */
    redirectMode?: 'modal' | 'blank' | 'self';
  };
  /**
   * Optional. An object containing customization options.
   */
  customization?: IWalletBrickCustomization;
  onSubmit?: never;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
}

export type TWallet = PreferenceOnInitialization | PreferenceOnSubmit;
