import { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

type TGenericRenderBrick = {
  settings: any;
  name: string;
  divId: string;
  controller: string;
};
export const initBrick = async ({ settings, name, divId, controller }: TGenericRenderBrick) => {
  const instanceMercadoPago = await MercadoPagoInstance.init();
  const bricksBuilder = instanceMercadoPago?.bricks();

  (window as { [key: string]: any })[controller] = await bricksBuilder?.create(
    name,
    divId,
    settings,
  );
};
