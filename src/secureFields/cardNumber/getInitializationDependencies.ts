import type { TCardNumberParams } from "./types";

const getInitializationDependencies = (params: TCardNumberParams): any => {
  // The commented props, should not cause the component to re-render
  const {
    enableLuhnValidation,
    // placeholder,
    customFonts,
    // length,
    group,
    style,
    onValidityChange,
    onBinChange,
    onChange,
    onError,
    onFocus,
    onReady,
    onBlur,
  } = params;

  /*
    We need to use JSON.stringify on "customFonts" and "style" because they are objects.
    So even when their values doesn't change, if "placeholder" or "length" changes,
    it will cause a component re-render and we don't want that to happen when
    the two last mentioned properties change.
  */
  return [
    JSON.stringify({...customFonts}),
    JSON.stringify(style),
    enableLuhnValidation,
    group,
    onValidityChange,
    onBinChange,
    onChange,
    onError,
    onFocus,
    onReady,
    onBlur,
  ];
};

export default getInitializationDependencies;