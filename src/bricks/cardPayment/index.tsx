import React, { useEffect } from 'react';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import {
  onErrorDefault,
  onReadyDefault,
  onSubmitDefault,
  onBinChangeDefault,
} from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { TCardPayment } from './type';

/**
 * Card Payment Brick allows you to offer payments with credit and debit card at yout checkout.
 *
 * Usage:
 *
 * ```ts
 * import CardPayment, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *      <CardPayment
 *       initialization={{amount: AMOUNT}} // AMOUNT is the value from the purchase, its the minium data to initialize CardPayment brick
 *       onSubmit={} // Receives a function that send the payment to backend and, through it, to MercadoPago
 *       />
 *  )
 * }
 * export default Example
 * ```
 *
 * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/introduction Card Payment Brick documentation} for more information.
 */

const CardPayment = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  initialization,
  customization,
  locale,
}: TCardPayment) => {
  useEffect(() => {
    // CardPayment uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;
    const CardPaymentBrickConfig = {
      settings: {
        initialization,
        customization,
        callbacks: {
          onReady,
          onSubmit,
          onError,
          onBinChange,
        },
        locale,
      },
      name: 'cardPayment',
      divId: 'cardPaymentBrick_container',
      controller: 'cardPaymentBrickController',
    };
    timer = setTimeout(() => {
      initBrick(CardPaymentBrickConfig);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.cardPaymentBrickController?.unmount();
    };
  }, [initialization, customization, onBinChange, onReady, onError, onSubmit]);

  return <div id="cardPaymentBrick_container"></div>;
};

export default CardPayment;
