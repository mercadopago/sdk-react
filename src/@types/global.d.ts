import { UpdateValues } from '../bricks/util/types/common';
import { Field } from '../secureFields/util/types';

export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: {
      unmount: () => void;
      /**
       * Updates data in Payment Brick preserving the current instance.
       *
       * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/additional-customization/update-data Payment Brick # Default rendering} documentation.
       */
      update: (updateValues: UpdateValues) => boolean;
    };
    cardPaymentBrickController: {
      unmount: () => void;
      getFormData: () => Promise<void>;
      /**
       * Updates data in Card Payment Brick preserving the current instance.
       *
       * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/additional-customization/update-data Payment Brick # Default rendering} documentation.
       */
      update: (updateValues: UpdateValues) => boolean;
    };
    walletBrickController: {
      unmount: () => void;
    };
    statusScreenBrickController: {
      unmount: () => void;
    };
    brandBrickController: {
      unmount: () => void;
    };
    cardNumberInstance: Field | undefined;
    securityCodeInstance: Field | undefined;
    expirationMonthInstance: Field | undefined;
    expirationYearInstance: Field | undefined;
    expirationDateInstance: Field | undefined;
  }
}
