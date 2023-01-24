import { loadMercadoPago } from '../loadMercadoPago';

export class MercadoPagoInstance {
  static publicKey: string | null = null;
  static instanceMercadoPago: any = '';

  static async init() {
    if (this.publicKey) {
      if (!this.instanceMercadoPago) {
        await loadMercadoPago();
        this.instanceMercadoPago = new window.MercadoPago(this.publicKey);
      }
      return this.instanceMercadoPago;
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

const useMercadoPago = (publicKey: string) => {
  MercadoPagoInstance.publicKey = publicKey;
};

export default useMercadoPago;
