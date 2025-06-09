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
    jest.clearAllMocks();
    mockMercadoPagoInstance.getInstance.mockResolvedValue(mockMP as any);
  });

  it('should create authenticator successfully', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    
    expect(authenticator).toBeDefined();
    expect(authenticator).toBe(mockAuthenticator);
    expect(mockMP.authenticator).toHaveBeenCalledWith('100.00', 'test@example.com');
  });

  it('should return null if MercadoPago instance is not available', async () => {
    mockMercadoPagoInstance.getInstance.mockResolvedValue(undefined);
    
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    
    expect(authenticator).toBeNull();
  });

  it('should handle errors gracefully', async () => {
    mockMP.authenticator.mockRejectedValue(new Error('Test error'));
    
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    
    expect(authenticator).toBeNull();
  });

  it('should return authenticator with correct methods', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    
    expect(authenticator?.show).toBeDefined();
    expect(authenticator?.getApplication).toBeDefined();
  });

  it('should call show method correctly', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    const showOptions = { hideUserConfirmation: true };
    
    await authenticator?.show(showOptions);
    
    expect(mockAuthenticator.show).toHaveBeenCalledWith(showOptions);
  });

  it('should call getApplication method correctly', async () => {
    const authenticator = await createAuthenticator('100.00', 'test@example.com');
    
    authenticator?.getApplication();
    
    expect(mockAuthenticator.getApplication).toHaveBeenCalled();
  });
});