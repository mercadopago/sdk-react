import React from 'react';
import { initMercadoPago, StatusScreen } from '../../../src/index';
import { IStatusScreenBrickInitialization } from '../../../src/bricks/statusScreen/types';
import { PUBLIC_KEY } from '../../constants';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const initialization: IStatusScreenBrickInitialization = {
    paymentId: '1307907697',
    additionalInfo: {
      externalResourceURL: 'https://eoql5ybmp0gwf41.m.pipedream.net',
      creq: 'teste',
    },
  };

  return <StatusScreen initialization={initialization} onError={(error) => console.error(error)} />;
};

export default App;
