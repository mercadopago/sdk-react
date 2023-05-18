import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { CardTokenUpdateParams } from "./types";

/** Token update method. */
const updateCardToken = async (paymentMethodsParams: CardTokenUpdateParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.updateCardToken(paymentMethodsParams);
};

export default updateCardToken;
