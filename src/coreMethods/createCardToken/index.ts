import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import { TFieldsCardTokenParams } from "./types";

/**
 * Secure Fields token creation method.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#mp-instancefieldscreatecardtokennonpcidata method documentation}.
 */
const createCardToken = async (cardTokenParams: TFieldsCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.fields.createCardToken(cardTokenParams);
};

export default createCardToken;
