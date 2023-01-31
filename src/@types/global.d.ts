export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
    cardPaymentBrickController: any;
    walletBrickController: {
      unmount: () => void;
    };
  }
}
