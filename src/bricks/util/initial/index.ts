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

export { onErrorDefault, onReadyDefault, onSubmitDefault, onBinChangeDefault };
