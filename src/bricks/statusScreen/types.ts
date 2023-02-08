import { IBrickCallbacks, IBrickVisual, IBrickStyle, IBrickCustomVariables, IBrickError } from './../util/types/common';

export interface IStatusScreenBrickSettings extends IStatusScreenBrickCallbacks {
  onReady?: () => void
  onError?: (param: IBrickError) => void
  initialization: IStatusScreenBrickInitialization
  customization?: IStatusScreenBrickCustomization
}

interface IStatusScreenBrickInitialization {
  paymentId: string
}

interface IStatusScreenBrickCallbacks extends IBrickCallbacks {}

interface IStatusScreenBrickCustomization {
  backUrls?: IStatusScreenBrickBackUrls
  visual?: TStatusScreenBrickVisual
}

interface IStatusScreenBrickBackUrls {
  error?: string
  return?: string
}

type TStatusScreenBrickVisual = IStatusScreenBrickBaseVisual & IStatusScreenBrickVisual

interface IStatusScreenBrickBaseVisual extends IBrickVisual<IStatusScreenBrickCustomizableTexts, IStatusScreenBrickStyle> {}

interface IStatusScreenBrickVisual {
  showExternalReference?: boolean
  hideTransactionDate?: boolean
  hideStatusDetails?: boolean
}

interface IStatusScreenBrickCustomizableTexts {
  ctaGeneralErrorLabel?: string
  ctaCardErrorLabel?: string
  ctaReturnLabel?: string
}

interface IStatusScreenBrickStyle extends IBrickStyle<IStatusScreenBrickCustomVariables> {}

interface IStatusScreenBrickCustomVariables extends IBrickCustomVariables {
  warningColor?: string
  fontSizeExtraExtraLarge?: string;
}
