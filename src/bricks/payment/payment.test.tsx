import React from 'react';
import { render, screen } from '@testing-library/react';
import Payment from './index';

const config = {
  initialization: {
    amount: 100, // valor total a ser pago
  },
  customization: {
    paymentMethods: {
      bankTransfer: ['pix'],
    },
  },
};

test('renders the Payment Brick', () => {
  render(<Payment config={config} onSubmit={() => console.log('teste')} />);
});
