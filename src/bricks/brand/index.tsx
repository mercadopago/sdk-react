import React, { useEffect } from 'react';
import { onReadyDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import { TBrand } from './types';

/**
 * Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process.
 *
 * Usage:
 *
 * ```ts
 * import Wallet, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *     <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>'}} /> // PREFERENCE_ID generated in backend
 *   )
 * }
 * export default Example
 * ```
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/introduction Wallet Brick documentation} for more information.
 */
const Brand = ({
  onReady = onReadyDefault,
  customization,
  locale,
}: TBrand) => {
  useEffect(() => {
    // CardPayment uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;
    const BrandBrickConfig = {
      settings: {
        customization,
        locale,
        callbacks: {
          onReady: onReady,
        },
      },
      name: 'brand',
      divId: 'brandBrick_container',
      controller: 'brandBrickController',
    };

    timer = setTimeout(() => {
      initBrick(BrandBrickConfig);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.brandBrickController?.unmount();
    };
  }, [customization, onReady]);
  return <div id="brandBrick_container"></div>;
};

export default Brand;
