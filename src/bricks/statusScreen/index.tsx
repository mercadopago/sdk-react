import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault } from '../util/initial';
import { IStatusScreenBrickSettings } from './types';
import { initBrick } from '../util/renderBrick';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';

// /**
//  * Status Screen Brick allows you to show buyer the status of a purchase made with any payment method provided by Checkout Bricks.
//  *
//  * Usage:
//  *
//  * ```ts
//  * import StatusScreen, {initMercadoPago} from '@mercadopago/sdk-react'
//  *
//  * initMercadoPago('YOUR_PUBLIC_KEY')
//  *
//  * const Example = () => {
//  *   return(
//  *     <StatusScreen
//  *       initialization={{ preferenceId: '<PREFERENCE_ID>'}} // PREFERENCE_ID generated in backend
//  *       onReady={() => {}} // Callback called when Brick is ready
//  *       onError={() => {}} // Callback called for all Brick error cases
//  *     />
//  *   )
//  * }
//  * export default Example
//  * ```
//  *
//  * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/status-screen-brick/introduction Status Screen Brick documentation} for more information.
//  */

const StatusScreen = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  customization,
  initialization,
  locale,
  id = 'statusScreenBrick_container',
}: IStatusScreenBrickSettings) => {
  useEffect(() => {
    // Status Screen uses a debounce to prevent unnecessary reRenders.
    const StatusScreenBrickConfig = {
      settings: {
        initialization,
        customization,
        locale,
        callbacks: {
          onReady,
          onError,
        },
      },
      name: 'statusScreen',
      containerId: id,
      controller: 'statusScreenBrickController',
    };
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      initBrick(StatusScreenBrickConfig);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.statusScreenBrickController?.unmount();
    };
  }, [initialization, customization, onReady, onError]);
  return <div id={id}></div>;
};

export default StatusScreen;
