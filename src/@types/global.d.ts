export {};

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
  }
}
