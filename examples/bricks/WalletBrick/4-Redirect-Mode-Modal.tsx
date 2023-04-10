import React from 'react';
import Wallet from '../../../src/bricks/wallet';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-e06664f9-d9e8-4eb1-9648-978abae52d90');

const ExampleRedirectModeModalOnWalletBrick = () => {
  return (
    <Wallet
      initialization={{
        preferenceId: '239656545-89accc4d-3fc9-4835-828b-b8fa16b2fdce',
        redirectMode: 'modal',
      }}
    />
  );
};

export default ExampleRedirectModeModalOnWalletBrick;
