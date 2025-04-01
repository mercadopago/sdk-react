import React from 'react';
import {
  initMercadoPago,
  CardNumber,
  SecurityCode,
  ExpirationDate,
  createCardToken,
} from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const App = () => {
  const cardToken = async () => {
    const response = await createCardToken({
      cardholderName: 'APRO',
      identificationType: '<BUYER_IDENTIFICATION_TYPE>',
      identificationNumber: '<BUYER_IDENTIFICATION_NUMBER>',
    });
    console.log('Card Token Response = ', response);
  };
  return (
    <>
      <CardNumber placeholder="Card Number" />
      <SecurityCode placeholder="Security Code" />
      <ExpirationDate placeholder="Expiration Date" mode="short" />
      <button onClick={() => cardToken()}>Pay</button>
    </>
  );
};

export default App;
