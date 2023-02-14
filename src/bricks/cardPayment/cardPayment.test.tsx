import React from 'react';
import { render } from '@testing-library/react';
import CardPayment from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

describe('Test Card Payment Brick Component', () => {
  test('should found the id of Card Payment Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <CardPayment
        initialization={{ amount: 100 }}
        onSubmit={async (param) => {
          console.log(param);
        }}
      />,
    );

    expect(element.container.querySelector('#cardPaymentBrick_container')).toBeTruthy();
  });
});
