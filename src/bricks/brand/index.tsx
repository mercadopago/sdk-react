import React, { useEffect } from 'react';
import { onReadyDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import { TBrand } from './types';

/**
 * Brand Brick allows you to communicate different messages related to the payment methods available via Mercado Pago in your store.
 *
 * Usage:
 *
 * ```ts
 * import Brand, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *     <Brand />
 *   )
 * }
 * export default Example
 * ```
 *
 * @see {@link https://www.mercadopago.com.ar/developers/en/docs/checkout-bricks/brand-brick/introduction Brand Brick documentation} for more information.
 */
const Brand = ({
  onReady = onReadyDefault,
  customization,
  locale,
  divId = 'brandBrick_container',
}: TBrand) => {
  useEffect(() => {
    // Brand uses a debounce to prevent unnecessary reRenders.
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
      divId,
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
  return <div id={divId}></div>;
};

export default Brand;
