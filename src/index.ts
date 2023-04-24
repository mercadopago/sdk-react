import initMercadoPago from './mercadoPago/initMercadoPago';

import CardPayment from './bricks/cardPayment';
import Payment from './bricks/payment';
import StatusScreen from './bricks/statusScreen';
import Wallet from './bricks/wallet';

import getIdentificationTypes from './coreMethods/getIdentificationTypes';
import getPaymentMethods from './coreMethods/getPaymentMethods';
import getInstallments from './coreMethods/getInstallments';
import getIssuers from './coreMethods/getIssuers';
import createCardToken from './coreMethods/createCardToken';

export {
  initMercadoPago,
  CardPayment,
  Payment,
  StatusScreen,
  Wallet,
  getIdentificationTypes,
  getPaymentMethods,
  getInstallments,
  getIssuers,
  createCardToken,
};
