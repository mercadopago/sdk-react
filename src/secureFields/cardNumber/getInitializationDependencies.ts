import type { TCardNumberParams } from "./types";

const getInitializationDependencies = (params: TCardNumberParams): any => {
  // The following props are commented to avoid re-render
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

  return [
    enableLuhnValidation,
    customFonts,
    style,
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