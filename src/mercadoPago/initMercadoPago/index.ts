import { loadMercadoPago } from '@mercadopago/sdk-js';
import { TInstanceMercadoPago, TOptions } from './type';

export class MercadoPagoInstance {
  static publicKey: string | null = null;
  static options: TOptions = {};
  static instanceMercadoPago?: TInstanceMercadoPago = undefined;
  static loadedInstanceMercadoPago: boolean = false;

  static async getInstance() {
    if (this.publicKey) {
      if (!this.loadedInstanceMercadoPago) {
        await loadMercadoPago();
        this.loadedInstanceMercadoPago = true;
      }
      if (!this.instanceMercadoPago) {
        this.instanceMercadoPago = new window.MercadoPago(this.publicKey, this.options);
      }
      return this.instanceMercadoPago;
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

function isOptionsObjectUnchanged(oldOption: TOptions, newOption: TOptions): boolean {
  const checkOptionObject =
    Object.keys(oldOption).length === Object.keys(newOption).length &&
    (Object.keys(oldOption) as (keyof typeof oldOption)[]).every((key) => {
      return (
        Object.prototype.hasOwnProperty.call(newOption, key) && oldOption[key] === newOption[key]
      );
    });
  return checkOptionObject;
}

/**
 * Create an instance of MercadoPago
 * @param publicKey string
 * @param options TOptions
 */
const initMercadoPago = (publicKey: string, options?: TOptions) => {
  const injectFrontEndOption = { ...options, frontEndStack: 'react' };

  const didOptionsChange = !isOptionsObjectUnchanged(
    MercadoPagoInstance.options,
    injectFrontEndOption,
  );
  if (publicKey !== MercadoPagoInstance.publicKey || didOptionsChange) {
    MercadoPagoInstance.publicKey = publicKey;
    MercadoPagoInstance.options = injectFrontEndOption;
    MercadoPagoInstance.instanceMercadoPago = undefined;
  }
};

export default initMercadoPago;
