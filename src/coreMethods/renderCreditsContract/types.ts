export interface CreditsContractOptions {
  fastPaymentToken: string;
  pseudotoken: string;
  pricingId: string;
  customization?: CreditsContractCustomization;
}

export interface CreditsContractCustomization {
  textColor?: string;
  textSize?: string;
  linkColor?: string;
}

export interface CreditsContractController {
  update: (options: { installments: string }) => Promise<boolean>;
}
