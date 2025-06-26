import updatePseudotoken from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

jest.mock('../../mercadoPago/initMercadoPago');

const mockMercadoPagoInstance = MercadoPagoInstance as jest.Mocked<typeof MercadoPagoInstance>;

describe('updatePseudotoken', () => {
  const mockMP = {
    updatePseudotoken: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockMercadoPagoInstance.getInstance.mockResolvedValue(mockMP as any);
  });

  it('should update pseudotoken successfully', async () => {
    const fastPaymentToken = 'eyJ0ZXN0IjoidmFsdWUifQ==';
    const pseudotoken = 'pseudo_123';
    const cardToken = 'card_token_456';
    
    const result = await updatePseudotoken(fastPaymentToken, pseudotoken, cardToken);

    expect(result).toBeUndefined();
    expect(mockMP.updatePseudotoken).toHaveBeenCalledWith(fastPaymentToken, pseudotoken, cardToken);
  });

  it('should return undefined if MercadoPago instance is not available', async () => {
    mockMercadoPagoInstance.getInstance.mockResolvedValue(undefined);

    const result = await updatePseudotoken('fastPaymentToken', 'pseudotoken', 'cardToken');

    expect(result).toBeUndefined();
  });
});