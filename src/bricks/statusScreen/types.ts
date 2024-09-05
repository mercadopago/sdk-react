import {
  IBrickCallbacks,
  IBrickVisual,
  IBrickStyle,
  IBrickCustomVariables,
  IBrickError,
} from './../util/types/common';

export interface IStatusScreenBrickSettings extends IStatusScreenBrickCallbacks {
  onReady?: () => void;
  onError?: (param: IBrickError) => void;
  /**
   * Required. Object containing initialization options.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/status-screen-brick/default-rendering Status Screen Brick # Default rendering} documentation.
   */
  initialization: IStatusScreenBrickInitialization;
  /**
   * Optional. Customizations object is used to load Brick under different conditions.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/status-screen-brick/default-rendering Status Screen Brick # Default rendering} documentation.
   */
  customization?: IStatusScreenBrickCustomization;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language General Customization # Select Language} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
}

export interface IStatusScreenBrickInitialization {
  /**
   * Required. The ID of the payment generated via Mercado Pago.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data initialization} documentation.
   */
  paymentId: string;
  /**
   * Optional. The addtional info necessary to 3DS authentication challenge.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data initialization} documentation.
   */
  additionalInfo?: IStatusScreenBrickAdditionalInfo;
}

type IStatusScreenBrickCallbacks = IBrickCallbacks;

export interface IStatusScreenBrickCustomization {
  /**
   * Optional. Controls whether the brick will show the user a button to navigate back to the seller's website. The url must be in the same domain and subdomain that the Brick is loaded on, urls in another domain will be ignored.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  backUrls?: IStatusScreenBrickBackUrls;
  /**
   * Optional. Control the visual aspects of the brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  visual?: TStatusScreenBrickVisual;
}

export interface IStatusScreenBrickBackUrls {
  /**
   * Optional. Defines the url that will be shown to the user in case of error in the payment.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  error?: string;
  /**
   * Optional. Defines the url that will be shown to the user in all scenarios of the brick. Useful to return to shopping page.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  return?: string;
}

type TStatusScreenBrickVisual = IStatusScreenBrickBaseVisual & IStatusScreenBrickVisual;

type IStatusScreenBrickBaseVisual = IBrickVisual<
  IStatusScreenBrickCustomizableTexts,
  IStatusScreenBrickStyle
>;

export interface IStatusScreenBrickVisual {
  /**
   * Optional. Shows the external_reference field from the Payments API.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  showExternalReference?: boolean;
  /**
   * Optional. Controls if the transaction date is shown in the Brick	.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  hideTransactionDate?: boolean;
  /**
   * Optional. Controls if the status detail of the payment is shown in the Brick.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  hideStatusDetails?: boolean;
    /**
   * Optional. Controls if the QR Code will be shown in the desktop view for Pix payments.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation. //TODO: change link when doc is available
   */
  hidePixQrCode?: boolean;
}

export interface IStatusScreenBrickCustomizableTexts {
  /**
   * Custom general error label text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  ctaGeneralErrorLabel?: string;
  /**
   * Custom card error label text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  ctaCardErrorLabel?: string;
  /**
   * Custom return label text.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/status-screen.md#initialization Data customization} documentation.
   */
  ctaReturnLabel?: string;
}

type IStatusScreenBrickStyle = IBrickStyle<IStatusScreenBrickCustomVariables>;

export interface IStatusScreenBrickCustomVariables extends IBrickCustomVariables {
  /**
   * Optional. Bricks custom variables.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  warningColor?: string;
  /**
   * Optional. Bricks custom variables.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/payment.md Customization} documentation.
   */
  fontSizeExtraExtraLarge?: string;
}

export interface IStatusScreenBrickAdditionalInfo {
  /**
   * Required. The External Resource URL sent by MercadoPago to the iFrame Challenge.
   *
   * @see {@link  Additional Info} documentation.
   */
  externalResourceURL: string;

  /**
   * Required. The Challenge Request Identificator sent by MercadoPago.
   *
   * @see {@link  Additional Info} documentation.
   */
  creq: string;
}
