import { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

type TGenericRenderBrick = {
  settings: Record<string, any>;
  name: string;
  containerId: string;
  controller: string;
};
export const initBrick = async ({
  settings,
  name,
  containerId,
  controller,
}: TGenericRenderBrick) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  const bricksBuilder = instanceMercadoPago?.bricks();

  (window as { [key: string]: any })[controller] = await bricksBuilder?.create(
    name,
    containerId,
    settings,
  );
};
