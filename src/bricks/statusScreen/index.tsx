import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault } from '../util/initial';
import { IStatusScreenBrickSettings } from './types';
import { initBrick } from '../util/renderBrick';

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
//  * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/status-screen-brick/introduction Status Screen Brick documentation} for more information.
//  */

const StatusScreen = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  customization,
  initialization,
}: IStatusScreenBrickSettings) => {
  useEffect(() => {
    const StatusScreenBrickConfig = {
      settings: {
        initialization,
        customization,
        callbacks: {
          onReady,
          onError,
        },
      },
      name: 'statusScreen',
      divId: 'statusScreenBrick_container',
      controller: 'statusScreenBrickController',
    };
    initBrick(StatusScreenBrickConfig);
    return () => {
      window.statusScreenBrickController?.unmount();
    };
  }, [initialization, customization, onReady, onError]);
  return <div id="statusScreenBrick_container"></div>;
};

export default StatusScreen;
