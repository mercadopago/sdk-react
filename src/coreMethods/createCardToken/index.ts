import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import { TFieldsCardTokenParams } from "./types";

/**
 * Token creation method.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/fields.md#mp-instancefieldscreatecardtokennonpcidata method documentation}.
 */
const createCardToken = async (cardTokenParams: TFieldsCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.fields.createCardToken(cardTokenParams);
};

export default createCardToken;
