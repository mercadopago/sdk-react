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
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/configure-integration#bookmark_render_brick Configure the integration # Render Brick} documentation.
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/additional-data Additional data} documentatio to understand the second param.
   */
  onSubmit: (param: ICardPaymentFormData, param2?: IAdditionalData) => Promise<void>;
  /**
   * Optional. Function. Receives function to be executed just after brick rendered
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/configure-integration#bookmark_render_brick Configure the integration # Render Brick} documentation.
   */
  onReady?: () => void;
  /**
   * Optional. Function. Receives function to be executed if an error occurs
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/configure-integration#bookmark_render_brick Configure the integration # Render Brick} documentation.
   */
  onError?: (param: IBrickError) => void;
  /**
   * Optional. Function. It is used to get the bin of the card being inserted into the Brick. This callback is called on the fly whenever the card bin is updated
   *
   * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/additional-callbacks Additional callbacks} documentation.
   */
  onBinChange?: (param: string) => void;
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
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/initialize-data-on-the-bricks Initialize data on the Brick} documentation.
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
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-installments Configure Installments} documentation.
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
       * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/configure-payment-methods Configure accepted payment methods} documentation.
       */
      types?: {
        /**
         * Non-Optional. String[]. Receives which payment method types won`t be shown
         */
        excluded: string[];
      };
    };
    /**
     * Optional. Object. Receives information about visual attributes, such as themes
     *
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/hide-element Hide title and flags} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/change-texts Change texts} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/set-theme Set theme} documentation.
     * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/additional-content/modify-css-variables Modify CSS variables} documentation.
     */
    visual?: object;
  };
};

interface ICardPaymentBrickPayer {
  email?: string;
  identification?: IPayerIdentification;
}
interface ICardPaymentFormData {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: ICardPaymentBrickPayer;
  payment_method_option_id?: string;
  processing_mode?: string;
}

interface IAdditionalData {
  bin: string;
}
