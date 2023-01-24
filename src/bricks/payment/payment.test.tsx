import React from 'react';
import { render } from '@testing-library/react';
import Payment from './index';

const config = {
  initialization: {
    amount: 100,
  },
  customization: {
    paymentMethods: {
      atm: 'all',
      ticket: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      debitCard: 'all',
      mercadoPago: 'all',
    },
  },
};

test('renders the Payment Brick', () => {
  render(<Payment config={config} onSubmit={() => console.log('teste')} />);
});
