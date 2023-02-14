import React from 'react';
import { render } from '@testing-library/react';
import WalletBrick from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

describe('Test Wallet Brick Component', () => {
  test('should found the id of Wallet Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <WalletBrick initialization={{ preferenceId: '<PREFERENCE_ID>' }} />,
    );

    expect(element.container.querySelector('#walletBrick_container')).toBeTruthy();
  });
});
