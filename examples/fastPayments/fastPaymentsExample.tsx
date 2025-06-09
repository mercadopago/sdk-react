import React, { useState, useEffect } from 'react';
import {
  initMercadoPago,
  createAuthenticator,
  getAccountPaymentMethods,
  getCardId,
  updatePseudotoken,
  SecurityCode,
} from '../../src/index';
import { AccountPaymentMethodsResponseData } from '../../src/coreMethods/getAccountPaymentMethods/types';
import { IAuthenticator } from '../../src/authenticator';

// Use the SDK type instead of redefining
type PaymentMethod = AccountPaymentMethodsResponseData;

interface FastPaymentState {
  email: string;
  amount: string;
  authenticator: IAuthenticator | null;
  supertoken: string | null;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string;
  securityCodeMounted: boolean;
  cardToken: string | null;
  loading: boolean;
  error: string | null;
}

const FastPaymentExample: React.FC = () => {
  const [state, setState] = useState<FastPaymentState>({
    email: 'test_user_82578115@testuser.com',
    amount: '100.00',
    authenticator: null,
    supertoken: null,
    paymentMethods: [],
    selectedPaymentMethod: '',
    securityCodeMounted: false,
    cardToken: null,
    loading: false,
    error: null,
  });

  // Initialize MercadoPago on component mount
  useEffect(() => {
    initMercadoPago('APP_USR-a4ffaa61-ddea-4666-84b9-04fb1b808112', {
      locale: 'pt-BR',
    });
  }, []);

  // Create authenticator when email and amount are set
  useEffect(() => {
    const createAuthenticatorInstance = async () => {
      if (state.email && state.amount && !state.authenticator) {
        try {
          setState(prev => ({ ...prev, loading: true, error: null }));
          const authenticator = await createAuthenticator(state.amount, state.email);
          setState(prev => ({ 
            ...prev, 
            authenticator, 
            loading: false,
            error: authenticator ? null : 'Failed to create authenticator' 
          }));
          console.log('Authenticator ready...');
        } catch (error) {
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: `Error creating authenticator: ${error}` 
          }));
        }
      }
    };

    createAuthenticatorInstance();
  }, [state.email, state.amount, state.authenticator]);

  // Step 1: Get SuperToken through authentication
  const handleAuthenticate = async () => {
    if (!state.authenticator) {
      setState(prev => ({ ...prev, error: 'Authenticator not ready' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const supertoken = await state.authenticator.show();
      
      if (supertoken) {
        setState(prev => ({ 
          ...prev, 
          supertoken, 
          loading: false 
        }));
        console.log('SuperToken obtained:', supertoken);
      } else {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: 'Authentication cancelled or failed' 
        }));
      }
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: `Authentication error: ${errorMessage}` 
      }));
      console.error('Authentication error:', error);
    }
  };

  // Step 2: Get account payment methods using SuperToken
  const handleGetPaymentMethods = async () => {
    if (!state.supertoken) {
      setState(prev => ({ ...prev, error: 'SuperToken required' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await getAccountPaymentMethods(state.supertoken);
      
      if (response?.data) {
        setState(prev => ({ 
          ...prev, 
          paymentMethods: response.data, 
          loading: false 
        }));
        console.log('Payment methods:', response.data);
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: `Error getting payment methods: ${error.message || error}` 
      }));
      console.error('Payment methods error:', error);
    }
  };

  // Step 3: Handle payment method selection and mount security code field
  const handlePaymentMethodSelect = (token: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedPaymentMethod: token,
      securityCodeMounted: false 
    }));

    // Mount security code field for credit/debit cards
    const selectedMethod = state.paymentMethods.find(method => method.token === token);
    if (selectedMethod && selectedMethod.type !== 'account_money') {
      setTimeout(() => {
        setState(prev => ({ ...prev, securityCodeMounted: true }));
      }, 100);
    }
  };

  // Step 4: Create card token and update pseudotoken
  const handleCreateCardToken = async () => {
    if (!state.supertoken || !state.selectedPaymentMethod) {
      setState(prev => ({ ...prev, error: 'SuperToken and payment method required' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Get card ID from pseudotoken
      const cardIdResponse = await getCardId(state.supertoken, state.selectedPaymentMethod);
      console.log('Card ID response:', cardIdResponse);

      if (!cardIdResponse?.card_id) {
        throw new Error('Failed to get card ID');
      }

      // Create card token using fields API (this would be implemented with the fields API)
      // For now, simulating the token creation
      const mockToken = {
        id: `card_token_${Date.now()}`,
        cardId: cardIdResponse.card_id,
      };

      // Update pseudotoken with the card token
      await updatePseudotoken(state.supertoken, state.selectedPaymentMethod, mockToken.id);

      setState(prev => ({ 
        ...prev, 
        cardToken: mockToken.id, 
        loading: false 
      }));
      
      console.log('Token created and updated successfully:', mockToken.id);
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: `Error creating token: ${error.message || error}` 
      }));
      console.error('Token creation error:', error);
    }
  };

  const updateState = (field: keyof FastPaymentState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const getPaymentMethodDisplayName = (method: PaymentMethod): string => {
    if (method.type === 'account_money') {
      return method.name;
    }
    
    // For credit/debit cards
    const lastFourDigits = 'card' in method ? method.card?.card_number.last_four_digits : '';
    return `${method.issuer.name} ending in ${lastFourDigits}`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Fast Payment Flow Example</h1>
      <p>Complete SuperToken authentication and payment flow</p>

      {/* Step 1: Configuration */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Step 1: Configuration</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => updateState('email', e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Amount: </label>
          <input
            type="number"
            value={state.amount}
            onChange={(e) => updateState('amount', e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <p>Status: {state.authenticator ? '✅ Authenticator ready' : '⏳ Preparing authenticator...'}</p>
      </div>

      {/* Step 2: Authentication */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Step 2: Authenticate & Get SuperToken</h3>
        <button
          onClick={handleAuthenticate}
          disabled={!state.authenticator || state.loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#009ee3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: state.authenticator && !state.loading ? 'pointer' : 'not-allowed'
          }}
        >
          {state.loading ? 'Authenticating...' : 'Authenticate'}
        </button>
        {state.supertoken && (
          <div style={{ marginTop: '10px' }}>
            <label>SuperToken (fastPaymentToken): </label>
            <textarea
              value={state.supertoken}
              readOnly
              style={{ 
                width: '100%', 
                height: '80px', 
                padding: '5px', 
                backgroundColor: '#f0f0f0',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        )}
      </div>

      {/* Step 3: Get Payment Methods */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Step 3: Get Payment Methods</h3>
        <button
          onClick={handleGetPaymentMethods}
          disabled={!state.supertoken || state.loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#00a650', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: state.supertoken && !state.loading ? 'pointer' : 'not-allowed'
          }}
        >
          {state.loading ? 'Loading...' : 'Get Payment Methods'}
        </button>
        
        {state.paymentMethods.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <label>Select Payment Method: </label>
            <select
              value={state.selectedPaymentMethod}
              onChange={(e) => handlePaymentMethodSelect(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            >
              <option value="">Select a payment method</option>
              {state.paymentMethods.map((method) => (
                <option key={method.token} value={method.token}>
                  {getPaymentMethodDisplayName(method)} ({method.type})
                </option>
              ))}
            </select>
            
            {/* Payment Methods Debug Info */}
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Payment Methods Details ({state.paymentMethods.length} found)
              </summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '3px',
                fontSize: '11px',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {JSON.stringify(state.paymentMethods, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>

      {/* Step 4: Security Code & Token Creation */}
      {state.selectedPaymentMethod && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Step 4: Security Code & Create Token</h3>
          
          {/* Show selected payment method info */}
          {(() => {
            const selectedMethod = state.paymentMethods.find(m => m.token === state.selectedPaymentMethod);
            return selectedMethod ? (
              <div style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                backgroundColor: '#e7f3ff', 
                borderRadius: '5px' 
              }}>
                <strong>Selected:</strong> {getPaymentMethodDisplayName(selectedMethod)}
                <br />
                <strong>Type:</strong> {selectedMethod.type}
                <br />
                <strong>Token:</strong> {selectedMethod.token}
              </div>
            ) : null;
          })()}
          
          {state.securityCodeMounted && (
            <div style={{ marginBottom: '10px' }}>
              <label>Security Code (CVV): </label>
              <div id="securityCode-container" style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                borderRadius: '3px',
                backgroundColor: 'white',
                minHeight: '40px'
              }}>
                <SecurityCode placeholder="CVV" />
              </div>
            </div>
          )}
          
          <button
            onClick={handleCreateCardToken}
            disabled={!state.selectedPaymentMethod || state.loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#f7931e', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: state.selectedPaymentMethod && !state.loading ? 'pointer' : 'not-allowed'
            }}
          >
            {state.loading ? 'Creating Token...' : 'Create Card Token'}
          </button>
          
          {state.cardToken && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
              <strong>✅ Success!</strong> 
              <br />
              <strong>Card Token:</strong> {state.cardToken}
              <br />
              <small>Token is now ready for payment processing!</small>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {state.error}
        </div>
      )}

      {/* Debug Information */}
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Debug Information</h3>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '3px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {JSON.stringify({
            hasAuthenticator: !!state.authenticator,
            hasSupertoken: !!state.supertoken,
            paymentMethodsCount: state.paymentMethods.length,
            selectedMethod: state.selectedPaymentMethod,
            hasCardToken: !!state.cardToken,
            loading: state.loading,
            authenticatorApplication: state.authenticator?.getApplication() || null,
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FastPaymentExample;