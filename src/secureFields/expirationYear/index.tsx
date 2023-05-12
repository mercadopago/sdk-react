import React, { useEffect } from 'react';
import { getInitializationDependencies, initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';
import { ExpirationYearParams } from "./types";

const ExpirationYear = (params: ExpirationYearParams) => {
  const initializationDependencies = getInitializationDependencies(params, ['placeholder']);

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('expirationYear', params)
        .then(instance => window.expirationYearInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.expirationYearInstance?.unmount();
      window.expirationYearInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="expirationYearSecureField_container"></div>;
};

export default ExpirationYear;
