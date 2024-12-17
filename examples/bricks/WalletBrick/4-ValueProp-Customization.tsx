import React from 'react';
import Wallet from '../../../src/bricks/wallet';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago(PUBLIC_KEY);

const ExampleValuePropCustomizationWalletBrick = () => {
  return (
    <Wallet
      initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
      customization={{ texts: { action: 'buy', valueProp: 'smart_option' } }}
    />
  );
};

export default ExampleValuePropCustomizationWalletBrick;
