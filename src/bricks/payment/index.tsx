import React, { useEffect } from 'react';
import { onBinChangeDefault, onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { TPaymentType } from './type';

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
 * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/introduction Payment Brick documentation} for more information.
 */
const BrickPayment = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  initialization,
  customization, 
}: TPaymentType) => {
  useEffect(() => {
    const PaymentBrickController = {
      settings: {
        initialization,
        customization, 
        callbacks: {
          onReady,
          onError,
          onSubmit,
          onBinChange
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
  }, [initialization, customization, onReady, onError, onSubmit, onBinChange]);

  return <div id="paymentBrick_container"></div>;
};

export default BrickPayment;
