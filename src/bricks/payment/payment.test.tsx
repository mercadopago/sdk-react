import React from 'react';
import { render } from '@testing-library/react';
import CardPayment from './index';

const config = {};

test('renders the Payment Brick', () => {
  render(
    <CardPayment
      config={config}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />,
  );
});
