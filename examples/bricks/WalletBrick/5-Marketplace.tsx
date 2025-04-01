import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

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
