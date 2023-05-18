import React from 'react';
import { initMercadoPago, createCardToken, CardNumber, SecurityCode, ExpirationDate } from '../../../src';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83');

const App = () => {
  const cardToken = async () => {
    const response = await createCardToken({
      cardholderName: 'APRO',
      identificationType: '<BUYER_IDENTIFICATION_TYPE>',
      identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
    })
    console.log('Card Token Response = ', response)
  }
  return (
    <>
      <CardNumber placeholder='Card Number'/>
      <SecurityCode placeholder='Security Code' />
      <ExpirationDate placeholder='Expiration Date' mode='short'/>
      <button onClick={() => cardToken()}>Pay</button>
    </>
  );
};

export default App;
