const onSubmitDefault = async () => {};
const onReadyDefault = () => {};
const onErrorDefault = (error: IBrickError) => {
  console.error(error);
};

export { onErrorDefault, onReadyDefault, onSubmitDefault };
