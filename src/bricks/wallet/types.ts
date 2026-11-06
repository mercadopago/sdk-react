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

/** An Order pair provisioned by the seller backend. It is never a navigation URL. */
export type WalletOrderCredentials = Readonly<{
  orderId: string;
  clientToken: string;
  preferenceId?: never;
  checkoutUrl?: never;
}>;

export type WalletSubmitResult = string | WalletOrderCredentials | null | undefined | void;
export type WalletOnSubmit = () => Promise<WalletSubmitResult>;

interface WalletInitializationOptions {
  /** Checkout presentation. Defaults to self; modal may fall back to same-window navigation. */
  redirectMode?: 'modal' | 'blank' | 'self';
  /** Enables the existing Wallet Marketplace mode. */
  marketplace?: boolean;
  checkoutUrl?: never;
}

export type WalletOrderInitialization = WalletInitializationOptions & WalletOrderCredentials;
export type WalletPreferenceInitialization = WalletInitializationOptions & {
  preferenceId: string;
  orderId?: never;
  clientToken?: never;
};
export type WalletDeferredInitialization = WalletInitializationOptions & {
  preferenceId?: never;
  orderId?: never;
  clientToken?: never;
};

interface WalletSettings extends IBrickSettings {
  /** Optional Wallet button appearance and Checkout customization. */
  customization?: IWalletBrickDarkCustomization | IWalletBrickDefaultCustomization;
  /** Locale passed to the Wallet Brick. */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /** Container ID. Defaults to walletBrick_container. */
  id?: string;
  checkoutUrl?: never;
  orderId?: never;
  clientToken?: never;
}

/** Legacy callback integrations retain this exported name and a strict result. */
export interface PreferenceOnSubmit extends WalletSettings {
  initialization?: WalletDeferredInitialization;
  onSubmit: WalletOnSubmit;
}

/** Legacy initialized Preference integrations retain this exported name. */
export interface PreferenceOnInitialization extends WalletSettings {
  initialization: WalletPreferenceInitialization;
  onSubmit?: WalletOnSubmit;
}

export interface OrderOnInitialization extends WalletSettings {
  initialization: WalletOrderInitialization;
  onSubmit?: WalletOnSubmit;
}

export type TWallet = PreferenceOnInitialization | PreferenceOnSubmit | OrderOnInitialization;
