import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { TWallet } from './types';
import { initBrick } from '../util/renderBrick';

/**
 * Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process.
 *
 * Usage:
 *
 * ```ts
 * import Wallet, {useMercadoPago} from '@mercadopago/sdk-react'
 *
 * useMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *     <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>'}} /> // PREFERENCE_ID generated in backend
 *   )
 * }
 * export default Example
 * ```
 *
 * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/wallet-brick/introduction Wallet Brick documentation} for more information.
 */
const Wallet = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault as () => Promise<unknown>,
  customization,
  initialization,
}: TWallet) => {
  useEffect(() => {
    const WalletBrickConfig = {
      settings: {
        initialization,
        customization,
        callbacks: {
          onReady: onReady,
          onSubmit: onSubmit,
          onError: onError,
        },
      },
      name: 'wallet',
      divId: 'walletBrick_container',
      controller: 'walletBrickController',
    };

    initBrick(WalletBrickConfig);
    return () => {
      window.walletBrickController?.unmount();
    };
  }, [customization, initialization, onReady, onError, onSubmit]);
  return <div id="walletBrick_container"></div>;
};

export default Wallet;
