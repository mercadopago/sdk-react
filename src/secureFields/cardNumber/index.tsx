import React, { useEffect } from 'react';
import type { TCardNumberParams } from './types';
import { getInitializationDependencies, initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';

const CardNumber = (params: TCardNumberParams) => {
  const initializationDependencies = getInitializationDependencies(params, ['placeholder', 'length']);

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('cardNumber', params)
        .then(instance => window.cardNumberInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.cardNumberInstance?.unmount();
      window.cardNumberInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="cardNumberSecureField_container"></div>;
};

export default CardNumber;
