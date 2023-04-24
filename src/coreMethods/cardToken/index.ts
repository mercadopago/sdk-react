import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import { TCardTokenParams } from "./types";

/**
 * Token creation method.
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancecreatecardtokencardtokenparams method documentation}.
 */
const createCardToken = async (cardTokenParams: TCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.createCardToken(cardTokenParams);
};

export default createCardToken;
