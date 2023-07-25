import React, { memo, useEffect } from 'react';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import {
  onBinChangeDefault,
  onErrorDefault,
  onReadyDefault,
  onSubmitDefault,
} from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { TPaymentType } from './type';
import { checkOnlyAmountIsDifferent } from '../util/amount/amount';

/**
 * Payment Brick allows you to add several payment methods to a store and save card data for future purchases with just one Brick.
 *
 * Usage:
 *
 * ```ts
 * import Payment, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *    <Payment
        initialization:{{ amount: AMOUNT }}, // AMOUNT is the value from the purchase, its the minium data to initialize CardPayment brick
        onSubmit={async () => {}} // Callback called when clicking on the data submission button
      />
 *   )
 * }
 * export default Example
 * ```
 *
 * @tutorial {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/introduction Payment Brick documentation} for more information.
 */
const PaymentBrick = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  initialization,
  customization,
  locale,
}: TPaymentType) => {
  useEffect(() => {
    // CardPayment uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;
    const PaymentBrickController = {
      settings: {
        initialization,
        customization,
        locale,
        callbacks: {
          onReady,
          onError,
          onSubmit,
          onBinChange,
        },
      },
      name: 'payment',
      divId: 'paymentBrick_container',
      controller: 'paymentBrickController',
    };
    timer = setTimeout(() => {
      initBrick(PaymentBrickController);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.paymentBrickController?.unmount();
    };
  }, [initialization, customization, onReady, onError, onSubmit, onBinChange]);

  return <div id="paymentBrick_container"></div>;
};

const memoizedPayment = memo(PaymentBrick, (prevProps: TPaymentType, nextProps: TPaymentType) => {
  if (JSON.stringify(prevProps) !== JSON.stringify(nextProps)) {
    const result = checkOnlyAmountIsDifferent(prevProps, nextProps);
    if (result) {
      if (window.paymentBrickController) {
        window.paymentBrickController.update({ amount: nextProps.initialization.amount });
      } else {
        console.warn(
          '[Checkout Bricks] Payment Brick is not initialized yet, please try again after a few seconds.',
        );
      }
      return true;
    }
    return false;
  }
  return true;
});

export default memoizedPayment;
