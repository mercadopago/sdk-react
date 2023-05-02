import React, { useEffect } from 'react';
import type { TCardNumberParams } from './types';
import type { IField } from '../util/types';
import { initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';

let cardNumberInstance: IField | undefined = undefined;

const CardNumber = (params: TCardNumberParams) => {

  useEffect(() => {
    // CardPayment uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('cardNumber', params).then(instance => cardNumberInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      cardNumberInstance?.unmount();
      cardNumberInstance = undefined;
    }
  }, []);

  return <div id="cardNumberSecureField_container"></div>;
};

export default CardNumber;
