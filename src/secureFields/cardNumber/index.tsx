import React, { useEffect } from 'react';
import type { TCardNumberParams } from './types';
import type { IField } from '../util/types';
import { initSecureField } from '../util';

let cardNumberInstance: IField | undefined = undefined;

const CardNumber = (params: TCardNumberParams) => {

  useEffect(() => {
    initSecureField('cardNumber', params)
      .then((instance) => {
        cardNumberInstance = instance;
      })


  });

  return <div id="cardNumberSecureField_container"></div>;
};

export default CardNumber;
