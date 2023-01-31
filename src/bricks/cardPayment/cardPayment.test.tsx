import React from 'react';
import { render } from '@testing-library/react';
import Payment from './index';

test('renders the Payment Brick with minimun config', () => {
  render(
    <Payment
      initialization={{ amount: 100 }}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />,
  );
});
