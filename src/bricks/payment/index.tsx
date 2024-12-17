import React, { useEffect } from 'react';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import {
  onBinChangeDefault,
  onClickEditBillingDataDefault,
  onClickEditShippingDataDefault,
  onErrorDefault,
  onReadyDefault,
  onRenderNextStepDefault,
  onRenderPreviousStepDefault,
  onSubmitDefault,
} from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { TPaymentType } from './type';
import { UpdateValues } from '../util/types/common';

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
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/introduction Payment Brick documentation} for more information.
 */
const Payment = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  onClickEditShippingData = onClickEditShippingDataDefault,
  onClickEditBillingData = onClickEditBillingDataDefault,
  onRenderNextStep = onRenderNextStepDefault,
  onRenderPreviousStep = onRenderPreviousStepDefault,
  initialization,
  customization,
  locale,
  id = 'paymentBrick_container',
}: TPaymentType) => {
  useEffect(() => {
    // Payment uses a debounce to prevent unnecessary reRenders.
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
          onClickEditShippingData,
          onClickEditBillingData,
          onRenderNextStep,
          onRenderPreviousStep,
        },
      },
      name: 'payment',
      containerId: id,
      controller: 'paymentBrickController',
    };
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      initBrick(PaymentBrickController);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.paymentBrickController?.unmount();
    };
  }, [initialization, customization, onReady, onError, onSubmit, onBinChange]);

  return <div id={id}></div>;
};

const usePaymentBrick = () => {
  const update = (updateValues: UpdateValues) => {
    if (window.paymentBrickController) {
      window.paymentBrickController.update(updateValues);
    } else {
      console.warn(
        '[Checkout Bricks] Payment Brick is not initialized yet, please try again after a few seconds.',
      );
    }
  };
  return { update };
};

export default Payment;
export { usePaymentBrick };
