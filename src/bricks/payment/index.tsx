import React, { useEffect } from 'react';
import { ClassUseMercadoPago } from '../../mercadoPago/useMercadoPago';
import { onErrorINIT, onReadyINIT, onSubmitINIT } from '../util/common/initial';
import { PaymentType } from './type';

const BricksPayment = ({
  config,
  onSubmit = onSubmitINIT,
  onReady = onReadyINIT,
  onError = onErrorINIT,
}: PaymentType) => {
  useEffect(() => {
    ClassUseMercadoPago.getPromiseMercadoPago()?.then((instanceMercadoPago: any) => {
      const bricksBuilder = instanceMercadoPago.bricks();
      const renderPaymentBrick = async (bricksBuilder: any) => {
        const settings = {
          ...config,
          callbacks: {
            onReady: onReady,
            onSubmit: onSubmit,
            onError: onError,
          },
        };
        window.paymentBrickController = await bricksBuilder.create(
          'payment',
          'paymentBrick_container',
          settings,
        );
      };
      renderPaymentBrick(bricksBuilder);
    });
  }, [config, onReady, onError, onSubmit]);

  return <div id="paymentBrick_container"></div>;
};

export default BricksPayment;
