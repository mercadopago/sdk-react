import React, { useEffect } from 'react';
import { getInitializationDependencies, initSecureField } from '../util';
import { DEBOUNCE_TIME_RENDER } from '../../bricks/util/constants';
import type { SecurityCodeParams } from './types';

const SecurityCode = (params: SecurityCodeParams) => {
  const initializationDependencies = getInitializationDependencies(
    params,
    ['placeholder', 'length', 'mode'],
  );

  useEffect(() => {
    // SecureField uses a debounce to prevent unnecessary reRenders.
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      initSecureField('securityCode', params)
        .then(instance => window.securityCodeInstance = instance);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.securityCodeInstance?.unmount();
      window.securityCodeInstance = undefined;
    }
  }, initializationDependencies);

  return <div id="securityCodeSecureField_container"></div>;
};

export default SecurityCode;
