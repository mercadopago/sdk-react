import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { TWallet } from './types';
import { initBrick } from '../util/renderBrick';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';

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
const Wallet = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault as () => Promise<unknown>,
  customization,
  initialization,
  locale,
  id = 'walletBrick_container',
}: TWallet) => {
  useEffect(() => {
    // CardPayment uses a debounce to prevent unnecessary reRenders.

    const WalletBrickConfig = {
      settings: {
        initialization,
        customization,
        locale,
        callbacks: {
          onReady: onReady,
          onSubmit: onSubmit,
          onError: onError,
        },
      },
      name: 'wallet',
      containerId: id,
      controller: 'walletBrickController',
    };

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      initBrick(WalletBrickConfig);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.walletBrickController?.unmount();
    };
  }, [customization, initialization, onReady, onError, onSubmit]);
  return <div id={id}></div>;
};

export default Wallet;
