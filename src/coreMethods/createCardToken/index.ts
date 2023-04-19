import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TCardTokenParams } from "./types";

/**
 * Token creation method.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancecreatecardtokencardtokenparams method documentation}.
 */
const createCardToken = async (cardTokenParams: TCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.createCardToken(cardTokenParams);
};

export default createCardToken;
