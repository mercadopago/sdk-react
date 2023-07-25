import { TCardPayment } from '../../cardPayment/type';
import { TPaymentType } from '../../payment/type';
import { deepCopy } from '../deepCopy';

export const checkOnlyAmountIsDifferent = (
  obj1: TCardPayment | TPaymentType,
  obj2: TCardPayment | TPaymentType,
): boolean => {
  const obj1WithoutAmount: {
    initialization: { amount?: number };
  } = deepCopy(obj1);
  const obj2WithoutAmount: {
    initialization: { amount?: number };
  } = deepCopy(obj2);

  delete obj1WithoutAmount.initialization.amount;
  delete obj2WithoutAmount.initialization.amount;

  if (JSON.stringify(obj1WithoutAmount) === JSON.stringify(obj2WithoutAmount)) {
    if (obj1.initialization.amount !== obj2.initialization.amount) {
      return true;
    }
  }
  return false;
};
