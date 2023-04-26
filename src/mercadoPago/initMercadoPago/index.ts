import { loadMercadoPago } from '@mercadopago/sdk-js';
import { TInstanceMercadoPago, TOptions } from './type';

export class MercadoPagoInstance {
  static publicKey: string | null = null;
  static options: TOptions = {};
  static instanceMercadoPago?: TInstanceMercadoPago = undefined;

  static async getInstance() {
    if (this.publicKey) {
      if (!this.instanceMercadoPago) {
        await loadMercadoPago();
        this.instanceMercadoPago = new window.MercadoPago(this.publicKey, this.options);
      }
      return this.instanceMercadoPago;
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}
/**
 * Create an instance of MercadoPago
 * @param publicKey string
 * @param options TOptions
 */
const initMercadoPago = (publicKey: string, options?: TOptions) => {
  MercadoPagoInstance.publicKey = publicKey;
  MercadoPagoInstance.options = options || {};
};

export default initMercadoPago;
