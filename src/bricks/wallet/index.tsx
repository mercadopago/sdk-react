import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { TWallet } from './types';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import type { BrickController } from '../../mercadoPago/initMercadoPago/type';
import { IBrickError } from '../util/types/common';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';

const useCommittedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const serializeSettings = (settings: Pick<TWallet, 'initialization' | 'customization'>) =>
  JSON.stringify(settings, (_key, value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
    const sorted: Record<string, unknown> = Object.create(null);
    Object.keys(value)
      .sort()
      .forEach((property) => {
        sorted[property] = value[property];
      });
    return sorted;
  });

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
  const callbacks = useRef({ onReady, onError, onSubmit });
  const pendingCreation = useRef<Promise<void>>(Promise.resolve());
  const settings = serializeSettings({ initialization, customization });

  useCommittedEffect(() => {
    callbacks.current = { onReady, onError, onSubmit };
  }, [onReady, onError, onSubmit]);

  useEffect(() => {
    let disposed = false;
    let controller: BrickController | undefined;

    const create = async () => {
      if (disposed) return;
      const instance = await MercadoPagoInstance.getInstance();
      if (disposed || !instance) return;
      const createdController = await instance.bricks().create('wallet', id, {
        ...JSON.parse(settings),
        locale,
        callbacks: {
          onReady: () => {
            if (!disposed) callbacks.current.onReady();
          },
          onError: (error: IBrickError) => {
            if (!disposed) callbacks.current.onError(error);
          },
          onSubmit: () => (disposed ? Promise.resolve() : callbacks.current.onSubmit()),
        },
      });
      if (disposed) {
        createdController.unmount();
        return;
      }
      controller = createdController;
      window.walletBrickController = controller;
    };

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      const creation = pendingCreation.current.then(create, create);
      pendingCreation.current = creation;
      void creation.catch((error: IBrickError) => {
        if (!disposed) callbacks.current.onError(error);
      });
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      disposed = true;
      clearTimeout(timer);
      controller?.unmount();
      if (window.walletBrickController === controller) delete window.walletBrickController;
    };
  }, [settings, id, locale]);
  return <div id={id}></div>;
};

export default Wallet;
