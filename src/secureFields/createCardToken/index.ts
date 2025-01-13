import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import { FieldsCardTokenParams } from './types';

/**
 * Secure Fields token creation method.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/fields.md#mp-instancefieldscreatecardtokennonpcidata method documentation}.
 */
const createCardToken = async (cardTokenParams: FieldsCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.fields.createCardToken(cardTokenParams);
};

export default createCardToken;
