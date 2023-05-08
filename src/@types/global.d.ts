import { IField } from "../secureFields/util/types";

export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: {
      unmount: () => void;
    };
    cardPaymentBrickController: {
      unmount: () => void;
      getFormData: () => Promise<void>;
    };
    walletBrickController: {
      unmount: () => void;
    };
    statusScreenBrickController: {
      unmount: () => void;
    };
    cardNumberInstance: IField | undefined;
    securityCodeInstance: IField | undefined;
    expirationMonthInstance: IField | undefined;
  }
}
