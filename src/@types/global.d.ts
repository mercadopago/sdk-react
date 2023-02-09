export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: {
      unmount: () => void;
    };
    cardPaymentBrickController: {
      unmount: () => void;
    };
    walletBrickController: {
      unmount: () => void;
    };
    statusScreenBrickController: {
      unmount: () => void;
    }
  }
}
