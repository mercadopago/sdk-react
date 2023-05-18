import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";

/** Secure Fields token update method. */
const updateCardToken = async (token: string) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  return instanceMercadoPago?.fields.updateCardToken(token);
};

export default updateCardToken;
