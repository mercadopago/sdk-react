import React from 'react';
import { initMercadoPago, Wallet } from '../../../src/index';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY);

const ExampleOnSubmitWalletBrick = () => {
  function onSubmit() {
    // callback called when clicking Wallet Brick
    // this is possible because the brick is a button
    // at this time of submit, you must create the preference (for more
    // info see step 5, create preference)
    const yourRequestBodyHere = {
      items: [
        {
          id: '202809963',
          title: 'Dummy title',
          description: 'Dummy description',
          quantity: 1,
          unit_price: 10,
        },
      ],
      purpose: 'wallet_purchase',
    };

    return new Promise((resolve, reject) => {
      fetch('/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yourRequestBodyHere),
      })
        .then((response) => response.json())
        .then((data) => {
          // resolver a promise com o ID da preferência
          resolve(data.preference_id);
        })
        .catch((error) => {
          // lidar com a resposta de erro ao tentar criar a preferência
          reject();
        });
    });
  }
  return <Wallet onSubmit={() => onSubmit()} />;
};

export default ExampleOnSubmitWalletBrick;
