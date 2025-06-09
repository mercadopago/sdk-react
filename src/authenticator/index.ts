import { MercadoPagoInstance } from '../mercadoPago/initMercadoPago';
import type {
  ShowAuthenticatorOptions,
  PaymentRequestHandlerApplication,
  IAuthenticator,
} from './types';

/**
 * Creates a new authenticator instance for SuperToken authentication
 * @param amount - The amount to be processed on the payment request
 * @param payerEmail - The email of the payer
 * @returns Promise that resolves to an authenticator instance
 */
const createAuthenticator = async (
  amount: string,
  payerEmail: string,
): Promise<IAuthenticator | null> => {
  try {
    const mp = await MercadoPagoInstance.getInstance();
    if (!mp) {
      console.error('MercadoPago instance not found. Make sure to call initMercadoPago first.');
      return null;
    }

    return await mp.authenticator(amount, payerEmail);
  } catch (error) {
    console.error('Error creating authenticator:', error);
    return null;
  }
};

export default createAuthenticator;
export type { ShowAuthenticatorOptions, IAuthenticator, PaymentRequestHandlerApplication };