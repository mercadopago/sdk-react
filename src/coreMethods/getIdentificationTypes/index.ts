import { MercadoPagoInstance } from "../../mercadoPago/initMercadoPago";

/**
 * Return all the document types based on the public_key
 * 
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancegetidentificationtypes method documentation}.
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get response documentation}.
 */
const getIdentificationTypes = async () => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  return instanceMercadoPago?.getIdentificationTypes();
};

export default getIdentificationTypes;
