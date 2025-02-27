import { IBrickError, IPayerIdentification } from '../util/types/common';

export type BricksBuilderType = {
  create: (param: string, param2: string, settings: object) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export type TCardPayment = {
  /**
   * Required. Function. Receives function to send the payment to backend
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/default-rendering Card Payment Brick # Default rendering} documentation.
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/additional-data Card Payment Brick # Advanced features # Additional data} documentatio to understand the second param.
   */
  onSubmit: (
    param: ICardPaymentFormData<ICardPaymentBrickPayer>,
    param2?: IAdditionalData,
  ) => Promise<void>;
  /**
   * Optional. Function. Receives function to be executed just after brick rendered
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/default-rendering Card Payment Brick # Default rendering} documentation.
   */
  onReady?: () => void;
  /**
   * Optional. Function. Receives function to be executed if an error occurs
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/default-rendering Card Payment Brick # Default rendering} documentation.
   */
  onError?: (param: IBrickError) => void;
  /**
   * Optional. Function. It is used to get the bin of the card being inserted into the Brick. This callback is called on the fly whenever the card bin is updated
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/additional-callbacks Card Payment Brick # Advanced features # Additional callbacks} documentation.
   */
  onBinChange?: (param: string) => void;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language General Customization # Select Language} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Required. Object. At minimun receive the amount atribute.
   */
  initialization: {
    /**
     * Required. Number. Receives the value to be payed.
     */
    amount: number;
    /**
     * Optional. Object. Receives information from payer and fill up the correspondent fields
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/initialize-data-on-the-bricks Card Payment Brick # Advanced features # Initialize data on the Brick} documentation.
     */
    payer?: ICardPaymentBrickPayer;
  };
  /**
   * Optional. Object. Receives information that change behaviour and/or visual from the brick
   */
  customization?: {
    /**
     * Optional. Object. Receives information about installments and payment method types
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/configure-installments Card Payment Brick # Advanced features # Configure Installments} documentation.
     */
    paymentMethods?: {
      /**
       * Optional. Number. Receives minimum quantity of installments
       */
      minInstallments?: number;
      /**
       * Optional. Number. Receives maximun quantity of installments
       */
      maxInstallments?: number;
      /**
       * Optional. Object. Receives excluded attribute
       *
       * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/configure-payment-methods Card Payment Brick # Advanced features # Configure accepted payment methods} documentation.
       */
      types?: {
        /**
         * Optional. String[]. Receives which payment method types won`t be shown
         */
        excluded?: TCardPaymentBrickPaymentType[];
        included?: TCardPaymentBrickPaymentType[];
      };
    };
    /**
     * Optional. Object. Receives information about visual attributes, such as themes
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/visual-customizations/hide-element Card Payment Brick # Visual customizations # Hide Elements} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/visual-customizations/change-texts Card Payment Brick # Visual customizations # Change texts} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/set-theme General Customization # Set theme} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/modify-css-variables General Customization # Modify CSS variables} documentation.
     */
    visual?: object;
  };
  /**
   * Optional. Container ID where the Brick will be rendered. Default: 'cardPaymentBrick_container'
   */
  id?: string;
};

export interface ICardPaymentBrickPayer {
  /**
   * Payer email
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  email?: string;
  /**
   * Payer identification data
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  identification?: IPayerIdentification;
}

export interface ICardPaymentFormData<ICardPaymentBrickPayer> {
  /**
   * Token generated
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  token: string;
  /**
   * Issuer id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  issuer_id: string;
  /**
   * Payment method id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Transaction amount that the user filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Installments quantity that the user filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  installments: number;
  /**
   * Payer data filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  payer: ICardPaymentBrickPayer;
  /**
   * Payment method option id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  payment_method_option_id?: string;
  /**
   * Processing mode
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  processing_mode?: string;
}

export interface IAdditionalData {
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md#brick-controllergetadditionaldata AdditionalData} documentation.
   */
  bin: string;
  /**
   *  Required. Last four digits of card entered by user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md#brick-controllergetadditionaldata AdditionalData} documentation.
   */
  lastFourDigits: string;
  /**
   *  Optional. Cardholder name of card entered by user.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md#brick-controllergetadditionaldata AdditionalData} documentation.
   */
  cardholderName?: string;
  /**
   *  Optional. Payment Type Id associated with the payment method.
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md#brick-controllergetadditionaldata AdditionalData} documentation.
   */
  paymentTypeId?: string;
}

/**
 * Card payment types
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/advanced-features/configure-payment-methods Card Payment Brick # Advanced features # Configure accepted payment methods} documentation.
 */
type TCardPaymentBrickPaymentType = 'credit_card' | 'debit_card' | 'prepaid_card';

export interface ICardPaymentBrickVisual {
  /**
   * Customization to hide payment button
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  hidePaymentButton?: boolean;
  /**
   * Customization to hide form title
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/bricks/card-payment.md additional data customization} documentation.
   */
  hideFormTitle?: boolean;
}
