import React, { useEffect } from 'react';
import { MercadoPagoInstance } from '../../mercadoPago/useMercadoPago';
import { onErrorDefault, onReadyDefault, onSubmitDefault } from '../util/initial';
import { BricksBuilderType, InstanceMercadoPagoType, PaymentType } from './type';

const BrickPayment = ({
  config,
  onSubmit = onSubmitDefault,
  onReady = onReadyDefault,
  onError = onErrorDefault,
}: PaymentType) => {
  useEffect(() => {
    const initPaymentBrick = async () => {
      const instanceMercadoPago = (await MercadoPagoInstance.init()) as InstanceMercadoPagoType;
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

export default BrickPayment;
