import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { PaymentType } from './type';

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
