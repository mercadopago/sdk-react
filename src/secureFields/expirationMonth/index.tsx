import React, { useEffect } from 'react';
import { getInitializationDependencies, initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';
import type { TExpirationMonthParams } from "./types";

const ExpirationMonth = (params: TExpirationMonthParams) => {
  const initializationDependencies = getInitializationDependencies(params);

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('expirationMonth', params)
        .then(instance => window.expirationMonthInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.expirationMonthInstance?.unmount();
      window.expirationMonthInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="expirationMonthSecureField_container"></div>;
};

export default ExpirationMonth;
