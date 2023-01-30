import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { PaymentType } from './type';

/**
 * Payment Brick allows you to add several payment methods to your store with just one Brick, allowing you to save card data for future purchases.
 *
 * Usage:
 *
 * ```ts
 * import Payment, {useMercadoPago} from '@mercadopago/sdk-react'
 *
 * useMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *    <Payment
        config={
          initialization: {amount: 100}, customization: {paymentMethods: {}}
        }
        onSubmit={async () => {}}
        onError={() => {}}
        onReady={() => {}}
      />
 *   )
 * }
 * export default Example
 * ```
 *
 * @tutorial {@link https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/payment-brick/introduction Payment Brick documentation} for more information.
 */
const BrickPayment = ({
  config,
  onSubmit = onSubmitDefault,
  onReady = onReadyDefault,
  onError = onErrorDefault,
}: PaymentType) => {
  useEffect(() => {
    const PaymentBrickController = {
      settings: {
        ...config,
        callbacks: {
          onReady: onReady,
          onSubmit: onSubmit,
          onError: onError,
        },
      },
      name: 'payment',
      divId: 'paymentBrick_container',
      controller: 'paymentBrickController',
    };

    initBrick(PaymentBrickController);
    return () => {
      window.paymentBrickController?.unmount();
    };
  }, [config, onReady, onError, onSubmit]);

  return <div id="paymentBrick_container"></div>;
};

export default BrickPayment;
