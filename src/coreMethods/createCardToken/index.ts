import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";
import type { TCardTokenParams } from "./types";

const createCardToken = async (cardTokenParams: TCardTokenParams) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.createCardToken(cardTokenParams);
};

export default createCardToken;
