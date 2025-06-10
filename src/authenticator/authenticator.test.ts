import createAuthenticator from './index';
import { MercadoPagoInstance } from '../mercadoPago/initMercadoPago';

// Mock the MercadoPago instance
jest.mock('../mercadoPago/initMercadoPago');

const mockMercadoPagoInstance = MercadoPagoInstance as jest.Mocked<typeof MercadoPagoInstance>;

describe('createAuthenticator', () => {
  const mockAuthenticator = {
    show: jest.fn(),
    getApplication: jest.fn(),
  };

  const mockMP = {
    authenticator: jest.fn().mockResolvedValue(mockAuthenticator),
  };

  beforeEach(() => {
    mockAuthenticator.show.mockClear();
    mockAuthenticator.getApplication.mockClear();
    mockMP.authenticator.mockClear();

    mockMP.authenticator.mockResolvedValue(mockAuthenticator);
    mockMercadoPagoInstance.getInstance.mockResolvedValue(mockMP as any);
  });

  it('should create authenticator successfully', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');

    expect(authenticator).toBeDefined();
    expect(authenticator).toBe(mockAuthenticator);
    expect(mockMP.authenticator).toHaveBeenCalledWith('100.00', 'test@example.com');
  });

  it('should throw error if MercadoPago instance is not available', async () => {
    mockMercadoPagoInstance.getInstance.mockResolvedValue(undefined);

    await expect(createAuthenticator('100.00', 'test@example.com')).rejects.toThrow(
      'MercadoPago instance not found. Make sure to call initMercadoPago first.',
    );
  });

  it('should let authenticator errors propagate', async () => {
    const testError = new Error('Test error');
    mockMP.authenticator.mockRejectedValue(testError);

    await expect(createAuthenticator('100.00', 'test@example.com')).rejects.toThrow('Test error');
  });

  it('should return authenticator with correct methods', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');

    expect(authenticator.show).toBeDefined();
    expect(authenticator.getApplication).toBeDefined();
  });

  it('should call show method correctly', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    const showOptions = { hideUserConfirmation: true };

    await authenticator.show(showOptions);

    expect(mockAuthenticator.show).toHaveBeenCalledWith(showOptions);
  });

  it('should call getApplication method correctly', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');

    authenticator.getApplication();

    expect(mockAuthenticator.getApplication).toHaveBeenCalled();
  });
});
