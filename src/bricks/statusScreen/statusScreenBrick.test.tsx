import React from 'react';
import { render } from '@testing-library/react';
import StatusScreen from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

describe('Test Status Screen Brick Component', () => {
  test('should found the id of Status Screen Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(<StatusScreen initialization={{ paymentId: '<PAYMENT_ID>' }} />);

    expect(element.container.querySelector('#statusScreenBrick_container')).toBeTruthy();
  });
});
