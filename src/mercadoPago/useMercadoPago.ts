import { loadMercadoPago } from './loadMercadoPago';

export class ClassUseMercadoPago {
  static publicKey = '';
  static instanceMercadoPago: any = '';

  static async init() {
    if (this.publicKey) {
      if (!this.instanceMercadoPago) {
        await loadMercadoPago();
        this.instanceMercadoPago = new window.MercadoPago(this.publicKey);
      } 
      return this.instanceMercadoPago;
      }
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

const useMercadoPago = (publicKey: string) => {
  ClassUseMercadoPago.publicKey = publicKey;
};

export default useMercadoPago;
