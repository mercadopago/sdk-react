import React, { useEffect, useState } from 'react';
import { PUBLIC_KEY } from '../../constants';
import { initMercadoPago, CardNumber } from '../../../src/index';

initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

const App = () => {
  const [text, setText] = useState('Card Number');
  const [len, setLen] = useState(8);

  useEffect(() => {
    setTimeout(() => {
      console.log('Timeout 3000 - Placeholder and Length changed!');
      setText('Placeholder');
      setLen(10);
    }, 3000);
  }, []);

  return (
    <CardNumber
      length={len}
      placeholder={text}
      style={{ fontFamily: 'Sigmar' }}
      customFonts={[{ src: 'https://fonts.googleapis.com/css2?family=Sigmar' }]}
      onReady={(event) => console.log('Card number ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
