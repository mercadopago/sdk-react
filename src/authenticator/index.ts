import { MercadoPagoInstance } from '../mercadoPago/initMercadoPago';
import type {
  ShowAuthenticatorOptions,
  PaymentRequestHandlerApplication,
  IAuthenticator,
} from './types';

/**
 * Creates a new authenticator instance for SuperToken authentication
 * This feature is disabled by deafult, to enable it, please contact the offical *Mercado Pago* support via developer's website: www.mercadopago.com/developers
 * @param amount - The amount to be processed on the payment request
 * @param payerEmail - The email of the payer
 * @returns Promise that resolves to an authenticator instance
 */
const createAuthenticator = async (amount: string, payerEmail: string): Promise<IAuthenticator> => {
  const mp = await MercadoPagoInstance.getInstance();
  if (!mp) {
    throw new Error('MercadoPago instance not found. Make sure to call initMercadoPago first.');
  }

  return await mp.authenticator(amount, payerEmail);
};

export default createAuthenticator;
export type { ShowAuthenticatorOptions, IAuthenticator, PaymentRequestHandlerApplication };
