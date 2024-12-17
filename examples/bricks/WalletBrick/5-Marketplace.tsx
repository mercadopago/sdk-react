import React from 'react';
import Wallet from '../../../src/bricks/wallet';
import { PUBLIC_KEY } from '../../constants';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago(PUBLIC_KEY);

// Chech the API reference for more details about how to create the preferenceId
// https://www.mercadopago.com.br/developers/en/reference/preferences/_checkout_preferences/post

const ExampleWalletBrickMarketplace = () => {
  return (
    <Wallet
      initialization={{
        preferenceId: '<PREFERENCE_ID>',
        marketplace: true,
      }}
    />
  );
};

export default ExampleWalletBrickMarketplace;
