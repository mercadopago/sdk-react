/* eslint-disable @typescript-eslint/no-empty-function */
import { IBrickError } from '../types/common';

const onSubmitDefault = async () => {};
const onReadyDefault = () => {};
const onErrorDefault = (error: IBrickError) => {
  console.error(error);
};
const onBinChangeDefault = (bin: string) => {
  {
    console.log(bin);
  }
};
const onClickEditShippingDataDefault = () => {
  console.log('onClickEditShippingData default implementation');
};
const onClickEditBillingDataDefault = () => {
  console.log('onClickEditShippingData default implementation');
};
const onRenderNextStepDefault = (currentStep: string) => {
  console.log(currentStep);
};
const onRenderPreviousStepDefault = (currentStep: string) => {
  console.log(currentStep);
};

export {
  onErrorDefault,
  onReadyDefault,
  onSubmitDefault,
  onBinChangeDefault,
  onClickEditShippingDataDefault,
  onClickEditBillingDataDefault,
  onRenderNextStepDefault,
  onRenderPreviousStepDefault,
};
