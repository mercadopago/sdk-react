import React, { useEffect } from 'react';
import { getInitializationDependencies, initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';
import type { ExpirationDateParams } from "./types";

const ExpirationDate = (params: ExpirationDateParams) => {
  const initializationDependencies = getInitializationDependencies(params, ['placeholder']);

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('expirationDate', params)
        .then(instance => window.expirationDateInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.expirationDateInstance?.unmount();
      window.expirationDateInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="expirationDateSecureField_container"></div>;
};

export default ExpirationDate;
