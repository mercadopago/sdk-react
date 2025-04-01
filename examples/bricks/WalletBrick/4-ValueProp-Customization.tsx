import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const ExampleValuePropCustomizationWalletBrick = () => {
  return (
    <Wallet
      initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
      customization={{
        valueProp: 'convenience_all',
        customStyle: { valuePropColor: 'blue' },
      }}
    />
  );
};

export default ExampleValuePropCustomizationWalletBrick;
