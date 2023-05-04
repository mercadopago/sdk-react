import { IBrickError, IPayerIdentification } from '../util/types/common';

export type BricksBuilderType = {
  create: (param: string, param2: string, settings: object) => void;
};

export type InstanceMercadoPagoType = {
  bricks: () => BricksBuilderType;
};

export type TCardPayment = {
  /**
   * Non-optional. Function. Receives function to send the payment to backend
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/default-rendering Card Payment Brick # Default rendering} documentation.
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/additional-data Card Payment Brick # Additional Settings # Additional data} documentatio to understand the second param.
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
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/additional-callbacks Card Payment Brick # Additional Settings # Additional callbacks} documentation.
   */
  onBinChange?: (param: string) => void;
  /**
   * Optional. Language selection for the Brick, options are:
   * {pt, es, es-AR, es-MX, es-UY, es-PE, es-CL, es-CO, en}
   *
   * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/select-language General Customization # Select Language} documentation.
   */
  locale?: 'es-AR' | 'es-CL' | 'es-CO' | 'es-MX' | 'es-VE' | 'es-UY' | 'es-PE' | 'pt-BR' | 'en-US';
  /**
   * Non-optional. Object. At minimun receive the amount atribute.
   */
  initialization: {
    /**
     * Non-optional. Number. Receives the value to be payed.
     */
    amount: number;
    /**
     * Optional. Object. Receives information from payer and fill up the correspondent fields
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/initialize-data-on-the-bricks Card Payment Brick # Additional Settings # Initialize data on the Brick} documentation.
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
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-installments Card Payment Brick # Additional Settings # Configure Installments} documentation.
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
       * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-payment-methods Card Payment Brick # Additional Settings # Configure accepted payment methods} documentation.
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
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/hide-element Card Payment Brick # Additional Settings # Hide Elements} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/change-texts Card Payment Brick # Additional Settings # Change texts} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/set-theme General Customization # Set theme} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/modify-css-variables General Customization # Modify CSS variables} documentation.
     */
    visual?: object;
  };
};

export interface ICardPaymentBrickPayer {
  /**
   * Payer email
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  email?: string;
  /**
   * Payer identification data
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  identification?: IPayerIdentification;
}

export interface ICardPaymentFormData<ICardPaymentBrickPayer> {
  /**
   * Token generated
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  token: string;
  /**
   * Issuer id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  issuer_id: string;
  /**
   * Payment method id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  payment_method_id: string;
  /**
   * Transaction amount that the user filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  transaction_amount: number;
  /**
   * Installments quantity that the user filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  installments: number;
  /**
   * Payer data filled in the form
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  payer: ICardPaymentBrickPayer;
  /**
   * Payment method option id
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  payment_method_option_id?: string;
  /**
   * Processing mode
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  processing_mode?: string;
}

export interface IAdditionalData {
  /**
   * Bin of the card entered by the user.
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/additional-data Card Payment Brick # Additional Settings # Additional data customization} documentation.
   */
  bin: string;
}

/**
 * Card payment types
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-payment-methods Card Payment Brick # Additional Settings # Configure accepted payment methods} documentation.
 */
type TCardPaymentBrickPaymentType = 'credit_card' | 'debit_card';

export interface ICardPaymentBrickVisual {
  /**
   * Customization to hide payment button
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  hidePaymentButton?: boolean;
  /**
   * Customization to hide form title
   *
   * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/bricks/card-payment.md additional data customization} documentation.
   */
  hideFormTitle?: boolean;
}
