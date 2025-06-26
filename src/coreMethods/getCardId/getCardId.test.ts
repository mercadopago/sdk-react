import getCardId from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

jest.mock('../../mercadoPago/initMercadoPago');

const mockMercadoPagoInstance = MercadoPagoInstance as jest.Mocked<typeof MercadoPagoInstance>;

describe('getCardId', () => {
  const mockResponse = {
    card_id: 'card_123456789',
  };

  const mockMP = {
    getCardId: jest.fn().mockResolvedValue(mockResponse),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockMercadoPagoInstance.getInstance.mockResolvedValue(mockMP as any);
  });

  it('should get card ID successfully', async () => {
    const fastPaymentToken = 'eyJ0ZXN0IjoidmFsdWUifQ==';
    const pseudotoken = 'pseudo_123';
    const result = await getCardId(fastPaymentToken, pseudotoken);

    expect(result).toEqual(mockResponse);
    expect(mockMP.getCardId).toHaveBeenCalledWith(fastPaymentToken, pseudotoken);
  });

  it('should return undefined if MercadoPago instance is not available', async () => {
    mockMercadoPagoInstance.getInstance.mockResolvedValue(undefined);

    const result = await getCardId('fastPaymentToken', 'pseudotoken');

    expect(result).toBeUndefined();
  });
});