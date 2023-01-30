import React from 'react';
import { render } from '@testing-library/react';
import BrickPayment from './index';
import { MercadoPagoInstance } from '../../mercadoPago/useMercadoPago';

describe('Test Payment Brick Component', () => {
  test('should found the id of Payment Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <BrickPayment
        config={{
          initialization: { amount: 100 },
          customization: {
            paymentMethods: {
              bankTransfer: ['pix'],
              ticket: 'all',
              atm: 'all',
              creditCard: 'all',
              debitCard: 'all',
              mercadoPago: 'all',
            },
          },
        }}
      />,
    );

    expect(element.container.querySelector('#paymentBrick_container')).toBeTruthy();
  });
});
