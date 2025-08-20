import { IBrickSettings } from '../util/types/common';

export interface IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the button background. Default: 'default'. Options: default, black, blue, white.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  buttonBackground?: 'default' | 'black' | 'blue' | 'white';
  /**
   * Optional. Customizing the button height. Default: '48px'. Minimum: 48px. Maximum: free choice.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  buttonHeight?: string;
  /**
   * Optional. Customizing the button border-radius. Default: 6px.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  borderRadius?: string;
  /**
   * Optional. Customizing the button vertical padding. Default: '16px'. Minimum: 16px. Maximum: free choice.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  verticalPadding?: string;
  /**
   * Optional. Customizing the butto horizontal padding. Default: '0px'. Minimum: 0px. Maximum: free choice.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  horizontalPadding?: string;
  /**
   * Optional. Property that allows hiding the value proposition text (below the button). Default: false.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  hideValueProp?: boolean;
}

export interface IWalletBrickDarkCustomStyle extends IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the value prop text color. Default: black. Only black currently available.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#value-prop-color-availability Wallet Brick# Customization # Value Prop Color} documentation.
   */
  valuePropColor?: 'black';
}

export interface IWalletBrickDefaultCustomStyle extends IWalletBrickBaseCustomStyle {
  /**
   * Optional. Customizing the value prop text color. Default: blue. Options: blue, white.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#value-prop-color-availability Wallet Brick# Customization # Value Prop Color} documentation.
   */
  valuePropColor?: 'blue' | 'white';
}

interface IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   *
  * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
  */
  theme?: 'default' | 'dark';
  /**
   * Optional. Text that will be rendered below the Wallet button
   *
   * Note: 'convenience' is DEPRECATED. Use 'convenience_all' instead.
   * Note: when using 'payment_methods_logos', logos will be rendered instead of text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#value-prop-availability Wallet Brick# Customization # Value Prop} documentation.
   */
  valueProp?:
  | 'practicality'
  | 'convenience'
  | 'convenience_all'
  | 'security_details'
  | 'security_safety'
  | 'convenience_credits'
  | 'smart_option'
  | 'payment_methods_logos'
  | 'free_shipping'
  | 'ml_shipping';
  /**
   * Optional. Wallet Brick offers some customization over the Checkout Experience.
   *
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/checkout-pro.md#the-customization-object Checkout Pro# Customization } documentation.
   */
  checkout?: IWalletBrickCheckoutCustomization;
}

export interface IWalletBrickDarkCustomization extends IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  theme: 'dark';
  /**
   * Optional. Wallet Bricks allow customization of some additional styles. The available options are dependent on the chosen theme.
   *
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  customStyle?: IWalletBrickDarkCustomStyle;
}

export interface IWalletBrickDefaultCustomization extends IWalletBrickBaseCustomization {
  /**
   * Optional. Defines the visual theme of the Button.
   *
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  theme?: 'default';
  /**
   * Optional. Wallet Bricks allow customization of some additional styles. The available options are dependent on the chosen theme.
   *
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  customStyle?: IWalletBrickDefaultCustomStyle;
}

interface IWalletBrickCheckoutCustomization {
  /**
   * Optional. Wallet Brick offers two optional customizable theme variables that receive hexadecimal values:
   * {elementsColor, headerColor}
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/checkout-pro.md#the-customization-object Checkout Pro# Customization } documentation.
   */
  theme?: {
    elementsColor?: string;
    headerColor?: string;
  };
}

export interface PreferenceOnSubmit extends IBrickSettings {
  /**
   * Optional. An object containing initialization options.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#initialization Initialization} documentation
   */
  initialization?: {
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example blank. Default 'self'
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#opening-scheme Redirect Mode} documentation.
     * */
    redirectMode?: 'blank' | 'self';
  };
  /**
   * Optional. An object containing customization options.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  customization?: IWalletBrickDarkCustomization | IWalletBrickDefaultCustomization;
  onSubmit: () => Promise<unknown>;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#parameters Wallet Brick# Parameters} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'walletBrick_container'
   */
  id?: string;
}

export interface PreferenceOnInitialization extends IBrickSettings {
  initialization: {
    /**
     * Required. Autogenerated unique ID that identifies the preference. For example 036151801-2484cd71-7140-4c51-985a-d4cfcf133baf
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#initialization Initialization} documentation
     * */
    preferenceId: string;
    /**
     * Optional. The opening scheme allows you to define how the checkout will open for the user. For example blank. Default 'self'
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#opening-scheme Redirect Mode} documentation.
     * */
    redirectMode?: 'blank' | 'self';
    /**
     * Optional. This parameter enables the use of Wallet Brick in Marketplace mode
     *
     * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#initialization Initialization} documentation
     * */
    marketplace?: boolean;
  };
  /**
   * Optional. An object containing customization options.
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#customization Wallet Brick# Customization} documentation.
   */
  customization?: IWalletBrickDarkCustomization | IWalletBrickDefaultCustomization;
  onSubmit?: never;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/wallet.md#parameters Wallet Brick# Parameters} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'walletBrick_container'
   */
  id?: string;
}

export type TWallet = PreferenceOnInitialization | PreferenceOnSubmit;
