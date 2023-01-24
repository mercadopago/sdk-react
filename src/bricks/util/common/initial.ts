const onSubmitDefault = () => {};
const onReadyDefault = () => {};
const onErrorDefault = (error: Error) => {
  console.error(error);
};

export { onErrorDefault, onReadyDefault, onSubmitDefault };
