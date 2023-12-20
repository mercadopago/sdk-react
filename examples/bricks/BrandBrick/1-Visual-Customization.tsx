import React from 'react';
import Brand from '../../../src/bricks/brand';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';

initMercadoPago('TEST-bfe30303-c7de-4da3-b765-c4be61b4f88b', {
  locale: 'es-AR',
});

const ExampleSimpleBrandBrick = () => {
  return (
    <Brand
      customization={{
        text: {
          valueProp: 'payment_methods_logos',
          useCustomFont: true,
          size: 'large',
          fontWeight: 'semibold',
          color: 'inverted',
        },
        paymentMethods: {
          excludedPaymentMethods: ['master'],
          excludedPaymentTypes: ['ticket'],
          maxInstallments: 4,
          interestFreeInstallments: false,
        },
        visual: {
          hideMercadoPagoLogo: false,
          contentAlign: 'center',
          backgroundColor: 'mercado_pago_primary',
          border: true,
          borderColor: 'dark',
          borderWidth: '2px',
          borderRadius: '10px',
          verticalPadding: '10px',
          horizontalPadding: '10px',
        },
      }}
      onReady={() => console.log('Brick is ready!')}
    />
  );
};

export default ExampleSimpleBrandBrick;
