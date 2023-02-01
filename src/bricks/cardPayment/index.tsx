import React, { useEffect } from 'react';
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
 * import CardPayment, {useMercadoPago} from '@mercadopago/sdk-react'
 *
 * useMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *      <CardPayment
 *       initialization={{amount: AMOUNT}} // AMOUNT is the value from the purchase, its the minium data to initialize CardPayment brick
 *       onSubmit={} // Receives a function that send the payment to backend and, through it, to MercadoPago
 *       onError={} // Optional: Receives a function that deal with errors
 *       onReady={} // Optional: Receives a function to execute after brick rendered
 *       onBinChange={} // Optional: Returns the Card BIN when the card number changes
 *       />
 *  )
 * }
 * export default Example
 * ```
 *
 * @tutorial {@link https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/card-payment-brick/introduction Card Payment Brick documentation} for more information.
 */

const CardPayment = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  initialization,
  customization,
}: TCardPayment) => {
  useEffect(() => {
    const CardPaymentBrickConfig = {
      settings: {
        initialization,
        customization,
        callbacks: {
          onReady: onReady,
          onSubmit: onSubmit,
          onError: onError,
          onBinChange: onBinChange,
        },
      },
      name: 'cardPayment',
      divId: 'cardPaymentBrick_container',
      controller: 'cardPaymentBrickController',
    };
    initBrick(CardPaymentBrickConfig);
    return () => {
      window.cardPaymentBrickController?.unmount();
    };
  }, [initialization, onReady, onError, onSubmit]);

  return <div id="cardPaymentBrick_container"></div>;
};

export default CardPayment;
