import React, { useEffect, useState } from 'react';

import initMercadoPago from '../../../src/mercadoPago/initMercadoPago';
import CardNumber from '../../../src/secureFields/cardNumber';

initMercadoPago('TEST-f4563544-ce69-40c3-b88e-6e7d1bd93a83', { locale: 'pt-BR' });

const App = () => {
  const [text, setText] = useState('Card Number')
  const [len, setLen] = useState(8)

  useEffect(() => {   
    setTimeout(() => {
      console.log('Timeout 3000 - Placeholder and Length changed!')
      setText('Placeholder')
      setLen(10)
    }, 3000)
  }, [])

  return (
    <CardNumber
      length={len}
      placeholder={text}
      style={{ fontFamily: 'Sigmar' }}
      customFonts={[{src: 'https://fonts.googleapis.com/css2?family=Sigmar'}]}
      onReady={(event) => console.log('Card number ready!!', event)}
      onError={(error) => console.log(error)}
    />
  );
};

export default App;
