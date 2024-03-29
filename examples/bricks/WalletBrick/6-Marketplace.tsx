import React from 'react';
import Wallet from '../../../src/bricks/wallet';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const ExampleWalletBrickMarketplace = () => {
  return <Wallet initialization={{ preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c', marketplace: true }} />;
};

export default ExampleWalletBrickMarketplace;
