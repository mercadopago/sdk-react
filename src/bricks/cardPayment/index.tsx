import React, { useEffect } from 'react';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { initBrick } from '../util/renderBrick';
import { CardPaymentType } from './type';

const BrickCardPayment = ({
  onSubmit = onSubmitDefault,
  onReady = onReadyDefault,
  onError = onErrorDefault,
  initialization,
  customization,
}: CardPaymentType) => {
  useEffect(() => {
    const CardPaymentBrickController = {
      settings: {
        initialization,
        customization,
        callbacks: {
          onReady: onReady,
          onSubmit: onSubmit,
          onError: onError,
        },
      },
      name: 'cardPayment',
      divId: 'cardPaymentBrick_container',
      controller: 'cardPaymentBrickController',
    };
    initBrick(CardPaymentBrickController);
    return () => {
      window.cardPaymentBrickController?.unmount();
    };
  }, [initialization, onReady, onError, onSubmit]);

  return <div id="cardPaymentBrick_container"></div>;
};

export default BrickCardPayment;
