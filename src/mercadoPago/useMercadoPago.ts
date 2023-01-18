import { loadMercadoPago } from './loadMercadoPago';

export class ClassUseMercadoPago {
  static publicKey = '';

  static getPromiseMercadoPago() {
    if (this.publicKey) {
      return loadMercadoPago(this.publicKey);
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

const useMercadoPago = (publicKey: string) => {
  ClassUseMercadoPago.publicKey = publicKey;
};

export default useMercadoPago;
