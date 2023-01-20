import React, { useEffect } from 'react';
import { ClassUseMercadoPago } from '../../mercadoPago/useMercadoPago';
import { onErrorINIT, onReadyINIT, onSubmitINIT } from '../util/common/initial';
import { BricksBuilderType, InstanceMercadoPagoType, PaymentType } from './type';

const BricksPayment = ({
  config,
  onSubmit = onSubmitINIT,
  onReady = onReadyINIT,
  onError = onErrorINIT,
}: PaymentType) => {
  useEffect(() => {
    const initPaymentBrick = async () => {
      const instanceMercadoPago = (await ClassUseMercadoPago.init()) as InstanceMercadoPagoType;
      const bricksBuilder = instanceMercadoPago.bricks();
      const renderPaymentBrick = async (bricksBuilder: BricksBuilderType) => {
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
    };
    initPaymentBrick();
  }, [config, onReady, onError, onSubmit]);

  return <div id="paymentBrick_container"></div>;
};

export default BricksPayment;
