import { UpdateValues } from '../bricks/util/types/common';
import { Field } from '../secureFields/util/types';

export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: {
      unmount: () => void;
      update: (updateValues: UpdateValues) => boolean;
    };
    cardPaymentBrickController: {
      unmount: () => void;
      getFormData: () => Promise<void>;
      update: (updateValues: UpdateValues) => boolean;
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
