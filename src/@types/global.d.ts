import { Field } from '../secureFields/util/types';

export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: {
      unmount: () => void;
      update: (updateValues: { amount: number }) => boolean;
    };
    cardPaymentBrickController: {
      unmount: () => void;
      getFormData: () => Promise<void>;
      update: (updateValues: { amount: number }) => boolean;
    };
    walletBrickController: {
      unmount: () => void;
    };
    statusScreenBrickController: {
      unmount: () => void;
    };
    cardNumberInstance: Field | undefined;
    securityCodeInstance: Field | undefined;
    expirationMonthInstance: Field | undefined;
    expirationYearInstance: Field | undefined;
    expirationDateInstance: Field | undefined;
  }
}
