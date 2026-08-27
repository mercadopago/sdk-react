import renderCreditsContract from './index';
import { CreditsContractOptions } from './types';
import { MercadoPagoInstance } from '../../mercadoPago/initMercadoPago';

jest.mock('../../mercadoPago/initMercadoPago', () => ({
  MercadoPagoInstance: {
    getInstance: jest.fn(),
  },
}));

describe('renderCreditsContract', () => {
  const mockController = {
    update: jest.fn().mockResolvedValue(true),
  };

  const mockMercadoPagoInstance = {
    renderCreditsContract: jest.fn().mockResolvedValue(mockController),
  };

  const mockedMercadoPagoInstance = MercadoPagoInstance as jest.Mocked<typeof MercadoPagoInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedMercadoPagoInstance.getInstance.mockResolvedValue(mockMercadoPagoInstance as any);
  });

  const validOptions: CreditsContractOptions = {
    fastPaymentToken: 'test_token',
    pseudotoken: 'test_pseudo',
    pricingId: 'test_pricing_id',
  };

  it('should call getInstance to get MercadoPago instance', async () => {
    await renderCreditsContract('container', validOptions);

    expect(mockedMercadoPagoInstance.getInstance).toHaveBeenCalled();
  });

  it('should call renderCreditsContract with correct parameters', async () => {
    const containerId = 'credits-container';
    
    await renderCreditsContract(containerId, validOptions);

    expect(mockMercadoPagoInstance.renderCreditsContract).toHaveBeenCalledWith(containerId, validOptions);
  });

  it('should return controller from MercadoPago instance', async () => {
    const result = await renderCreditsContract('container', validOptions);

    expect(result).toBe(mockController);
  });

  it('should work with customization options', async () => {
    const optionsWithCustomization: CreditsContractOptions = {
      ...validOptions,
      customization: {
        textColor: '#000000',
        textSize: '14px',
        linkColor: '#0066cc',
      },
    };

    await renderCreditsContract('container', optionsWithCustomization);

    expect(mockMercadoPagoInstance.renderCreditsContract).toHaveBeenCalledWith('container', optionsWithCustomization);
  });

  it('should handle when getInstance returns undefined', async () => {
    mockedMercadoPagoInstance.getInstance.mockResolvedValue(undefined);

    const result = await renderCreditsContract('container', validOptions);

    expect(result).toBeUndefined();
  });
});
