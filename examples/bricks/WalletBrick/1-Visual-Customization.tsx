import React from 'react';
import Wallet from '../../../src/bricks/wallet';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const ExampleVisualCustomizationWalletBrick = () => {
  return (
    <Wallet
      initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }}
      customization={{ visual: { buttonBackground: 'black', borderRadius: '20px' } }}
    />
  );
};

export default ExampleVisualCustomizationWalletBrick;
