export interface ShowAuthenticatorOptions {
  [key: string]: unknown;
}

export enum PaymentRequestHandlerApplication {
  MercadoLibre = 'ML',
  MercadoPago = 'MP',
}

export interface IAuthenticator {
  show(settings?: ShowAuthenticatorOptions): Promise<string | null>;
  getApplication(): PaymentRequestHandlerApplication | null;
}

export enum AuthenticatorErrors {
  NotInitialized = 'NOT_INITIALIZED',
  AlreadyShowing = 'ALREADY_SHOWING',
  SiteIdNotSupported = 'NOT_SUPPORTED_SITE_ID',
  InvalidEmail = 'INVALID_EMAIL_ADDRESS',
  InvalidAmount = 'INVALID_AMOUNT_VALUE',
  PRApiError = 'PAYMENT_REQUEST_ERROR',
  PRApiNotSupported = 'PAYMENT_REQUEST_NOT_SUPPORTED',
  AuthenticationNotSupported = 'AUTHENTICATION_FLOW_NOT_SUPPORTED',
  NoApplicationsDetected = 'NO_APPLICATIONS_DETECTED',
  ApplicationCheckError = 'APPLICATION_CHECK_ERROR',
  ApiRequestFailed = 'API_REQUEST_FAILED',
  BottomsheetLoadingFailed = 'BOTTOMSHEET_LOADING_FAILED',
  BottomsheetCloseFailed = 'BOTTOMSHEET_CLOSE_FAILED',
  NoBottomsheetConfirmation = 'NO_BOTTOMSHEET_CONFIRMATION',
  UnreachableApplication = 'UNREACHABLE_APPLICATION',
  SecurityBlocked = 'SECURITY_BLOCKED',
  PublicKeyNotSet = 'PUBLIC_KEY_NOT_SET',
  InvalidPlatformId = 'INVALID_PLATFORM_ID',
  InvalidBricks = 'INVALID_BRICKS',
}

export class AuthenticationError extends Error {
  public readonly code: AuthenticatorErrors;

  constructor(message: string, code: AuthenticatorErrors) {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
  }
}
