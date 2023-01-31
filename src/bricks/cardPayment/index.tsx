import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { CardPaymentType } from './type';

const BrickPayment = ({
  config,
  onSubmit = onSubmitDefault,
  onReady = onReadyDefault,
  onError = onErrorDefault,
}: CardPaymentType) => {
  useEffect(() => {
    const CardPaymentBrickController = {
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

    initBrick(CardPaymentBrickController);
    return () => {
      window.cardPaymentBrickController?.unmount();
    };
  }, [config, onReady, onError, onSubmit]);

  return <div id="carPaymentBrick_container"></div>;
};

export default BrickPayment;
