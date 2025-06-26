import getAccountPaymentMethods from './index';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

jest.mock('../../mercadoPago/initMercadoPago');

const mockMercadoPagoInstance = MercadoPagoInstance as jest.Mocked<typeof MercadoPagoInstance>;

describe('getAccountPaymentMethods', () => {
  const mockResponse = {
    data: [
      {
        id: 'visa',
        name: 'Visa',
        thumbnail: 'visa.png',
        token: 'abc123',
        type: 'credit_card',
      },
    ],
  };

  const mockMP = {
    getAccountPaymentMethods: jest.fn().mockResolvedValue(mockResponse),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockMercadoPagoInstance.getInstance.mockResolvedValue(mockMP as any);
  });

  it('should call get account payment methods successfully', async () => {
    const fastPaymentToken = 'eyJ0ZXN0IjoidmFsdWUifQ=='; // base64 encoded JSON
    const result = await getAccountPaymentMethods(fastPaymentToken);

    expect(result).toEqual(mockResponse);
    expect(mockMP.getAccountPaymentMethods).toHaveBeenCalledWith(fastPaymentToken);
  });

  it('should return undefined if MercadoPago instance is not available', async () => {
    mockMercadoPagoInstance.getInstance.mockResolvedValue(undefined);

    const result = await getAccountPaymentMethods('fastPaymentToken');

    expect(result).toBeUndefined();
  });
});