import React, { useEffect, useMemo } from 'react';
import type { TCardNumberParams } from './types';
import type { IField } from '../util/types';
import { initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';
import getInitializationDependencies from './getInitializationDependencies';

let cardNumberInstance: IField | undefined = undefined;

const CardNumber = (params: TCardNumberParams) => {
  const { placeholder, length } = params;
  const initializationDependencies = getInitializationDependencies(params);

  useEffect(() => {
    placeholder && cardNumberInstance?.update({ placeholder })
    length && cardNumberInstance?.update({ settings: { length } })
  }, [ placeholder, length ]);

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('cardNumber', params).then(instance => cardNumberInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      cardNumberInstance?.unmount();
      cardNumberInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="cardNumberSecureField_container"></div>;
};

export default CardNumber;
