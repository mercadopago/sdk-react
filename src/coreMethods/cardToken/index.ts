import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TFieldsCardTokenParams } from "./type";

const createCardToken = async (cardTokenParams: TFieldsCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.fields.createCardToken(cardTokenParams);
};

export default createCardToken;
