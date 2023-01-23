import { loadMercadoPago } from './loadMercadoPago';

export class MercadoPagoInstance {
  static publicKey = '';
  static instanceMercadoPago: any = '';

  static async init() {
    if (this.publicKey) {
      if (this.instanceMercadoPago) {
        return MercadoPagoInstance.instanceMercadoPago;
      } else {
        await loadMercadoPago();
        MercadoPagoInstance.instanceMercadoPago = new window.MercadoPago(this.publicKey);
        return MercadoPagoInstance.instanceMercadoPago;
      }
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

const useMercadoPago = (publicKey: string) => {
  MercadoPagoInstance.publicKey = publicKey;
};

export default useMercadoPago;
