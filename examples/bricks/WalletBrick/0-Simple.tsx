import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const ExampleSimpleWalletBrick = () => {
  return <Wallet initialization={{ preferenceId: 'YOUR_PREFERENCE_ID' }} />;
};

export default ExampleSimpleWalletBrick;
