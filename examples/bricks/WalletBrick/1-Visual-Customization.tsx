import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const ExampleVisualCustomizationWalletBrick = () => {
  return (
    <Wallet
      initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
      customization={{
        theme: 'dark',
        customStyle: { borderRadius: '20px' },
      }}
    />
  );
};

export default ExampleVisualCustomizationWalletBrick;
