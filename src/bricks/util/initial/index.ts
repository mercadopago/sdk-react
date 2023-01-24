import { IBrickError } from '../types/common';

const onSubmitDefault = () => {};
const onReadyDefault = () => {};
const onErrorDefault = (error: IBrickError) => {
  console.error(error);
};

export { onErrorDefault, onReadyDefault, onSubmitDefault };
