import { IBrickSettings } from '../util/types/common';

export interface IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the button background. Default: 'default'. Options: default, black, blue, white.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  buttonBackground?: 'default' | 'black' | 'blue' | 'white';
  /**
   * Optional. Customizing the button height. Default: '48px'. Minimum: 48px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  buttonHeight?: string;
  /**
   * Optional. Customizing the button border-radius. Default: 6px.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  borderRadius?: string;
  /**
   * Optional. Customizing the button vertical padding. Default: '16px'. Minimum: 16px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  verticalPadding?: string;
  /**
   * Optional. Customizing the butto horizontal padding. Default: '0px'. Minimum: 0px. Maximum: free choice.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  horizontalPadding?: string;
  /**
   * Optional. Property that allows hiding the value proposition text (below the button). Default: false.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Visual Customizations # Change appearance} documentation.
   */
  hideValueProp?: boolean;
}

export interface IWalletBrickDarkCustomStyle extends IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the value prop text color. Default: black. Only black currently available.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-texts Wallet Brick# Visual Customizations # Change Texts} documentation.
   */
  valuePropColor?: 'black';
}

export interface IWalletBrickDefaultCustomStyle extends IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the value prop text color. Default: blue. Options: blue, white.
   *
   *  @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-appearance Wallet Brick# Additional Settings # Change appearance} documentation.
   */
  valuePropColor?: 'blue' | 'white';
}

interface IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   */
  theme?: 'default' | 'dark';
  /**
   * Optional. Text that will be rendered below the Wallet button
   *
   * Note: 'convenience' is DEPRECATED. Use 'convenience_all' instead.
   * Note: when using 'payment_methods_logos', logos will be rendered instead of text.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/visual-customizations/change-texts Wallet Brick# Visual Customizations # Change Texts} documentation.
   */
  valueProp?:
    | 'practicality'
    | 'convenience'
    | 'convenience_all'
    | 'security_details'
    | 'security_safety'
    | 'convenience_credits'
    | 'smart_option'
    | 'payment_methods_logos';
  /**
   * Optional. Wallet Brick offers some customization over the Checkout Experience.
   *
   */
  checkout?: IWalletBrickCheckoutCustomization;
}

export interface IWalletBrickDarkCustomization extends IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   */
  theme: 'dark';
  /**
   * Optional. Wallet Bricks allow customization of some additional styles. The available options are dependent on the chosen theme.
   *
   */
  customStyle?: IWalletBrickDarkCustomStyle;
}

export interface IWalletBrickDefaultCustomization extends IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   */
  theme?: 'default';
  /**
   * Optional. Wallet Bricks allow customization of some additional styles. The available options are dependent on the chosen theme.
   *
   */
  customStyle?: IWalletBrickDefaultCustomStyle;
}

interface IWalletBrickCheckoutCustomization {
  /**
   * Optional. Wallet Brick offers two optional customizable theme variables that receive hexadecimal values:
   * {elementsColor, headerColor}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-pro/checkout-customization/user-interface/color-style Checkout Theme customization} documentation.
   */
  theme?: {
    elementsColor?: string;
    headerColor?: string;
  };
}

export interface PreferenceOnSubmit extends IBrickSettings {
  brand?: string;
  /**
   * Optional. An object containing initialization options.
   */
  initialization?: {
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example blank. Default 'self'
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/advanced-features/opening-mode Redirect Mode} documentation.
     * */
    redirectMode?: 'blank' | 'self';
  };
  /**
   * Optional. An object containing customization options.
   */
  customization?: IWalletBrickDarkCustomization | IWalletBrickDefaultCustomization;
  onSubmit: () => Promise<unknown>;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'walletBrick_container'
   */
  id?: string;
}

export interface PreferenceOnInitialization extends IBrickSettings {
  brand?: string;
  /**
   * Required. An object containing initialization options.
   */
  initialization: {
    /**
     * Required. Autogenerated unique ID that identifies the preference. For example 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post Create preference} documentation.
     * */
    preferenceId: string;
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example blank. Default 'self'
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/advanced-features/opening-mode Redirect Mode} documentation.
     * */
    redirectMode?: 'blank' | 'self';
    /**
     * Optional. This parameter enables the use of Wallet Brick in Marketplace mode
     *
     * */
    marketplace?: boolean;
  };
  /**
   * Optional. An object containing customization options.
   */
  customization?: IWalletBrickDarkCustomization | IWalletBrickDefaultCustomization;
  onSubmit?: never;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language Bricks language customization} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'walletBrick_container'
   */
  id?: string;
}

export type TWallet = PreferenceOnInitialization | PreferenceOnSubmit;
