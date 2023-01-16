import React from 'react';
import { onErrorINIT, onReadyINIT, onSubmitINIT } from '../util/common/initial';

const mp = new window.MercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');
const bricksBuilder = mp.bricks();

type PaymentType = {
  onSubmit?: () => void;
  onReady?: () => void;
  onError?: (param: Error) => void;
  config: {
    initialization: {
      amount: number;
    };
    customization: {
      paymentMethods: {
        bankTransfer: string[];
      };
    };
  };
};

const BricksPayment = ({
  config,
  onSubmit = onSubmitINIT,
  onReady = onReadyINIT,
  onError = onErrorINIT,
}: PaymentType) => {
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

  return <div id="paymentBrick_container"></div>;
};

export default BricksPayment;
