import React from 'react';
import { render } from '@testing-library/react';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';
import { Brand } from '../../index';

describe('Test Brand Brick Component', () => {
  test('should found the id of Brand Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(<Brand />);

    expect(element.container.querySelector('#brandBrick_container')).toBeTruthy();
  });

  test('should found the id of Brand Brick div', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <Brand
        customization={{
          text: {
            valueProp: 'payment_methods_logos',
          },
        }}
        onReady={() => console.log('Brick is ready!')}
      />,
    );

    expect(element.container.querySelector('#brandBrick_container')).toBeTruthy();
  });
  test('should found the id of Brand Brick div if specified', async () => {
    MercadoPagoInstance.publicKey = 'PUBLIC_KEY';
    const element = await render(
      <Brand
        customization={{
          text: {
            valueProp: 'payment_methods_logos',
          },
        }}
        id="customBrandBrick_container"
        onReady={() => console.log('Brick is ready!')}
      />,
    );

    expect(element.container.querySelector('#customBrandBrick_container')).toBeTruthy();
  });
});
