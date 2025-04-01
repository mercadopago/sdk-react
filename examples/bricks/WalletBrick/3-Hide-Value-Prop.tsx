import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const ExampleVisualCustomizationWalletBrick = () => {
  return (
    <Wallet
      initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
      customization={{ customStyle: { hideValueProp: true } }}
    />
  );
};

export default ExampleVisualCustomizationWalletBrick;
