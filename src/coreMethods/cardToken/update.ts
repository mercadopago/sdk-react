import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TCardTokenUpdateParams } from "./types";

/** Token update method. */
const updateCardToken = async (paymentMethodsParams: TCardTokenUpdateParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.updateCardToken(paymentMethodsParams);
};

export default updateCardToken;
