export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
    cardPaymentBrickController: {
      unmount: () => void;
    };
    walletBrickController: {
      unmount: () => void;
    };
  }
}
