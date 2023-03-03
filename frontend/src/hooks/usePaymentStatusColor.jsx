import { useEffect, useReducer } from 'react';

const usePaymentStatusColor = (status) => {
  const initialValue =
    'dark:text-gray-50 dark:border-gray-50 border-gray-900 text-gray-900  ';

  const paymentStatusColorReducer = (state, action) => {
    switch (action.type) {
      case 'paid':
        return {
          ...state,
          paymentStatusColor: 'text-green-600 border-green-600',
        };
      case 'pending':
        return {
          ...state,
          paymentStatusColor: 'text-orange-600 border-orange-600 ',
        };
      case 'quote':
        return {
          ...state,
          paymentStatusColor:
            'dark:text-gray-50 dark:border-gray-50 border-gray-900 text-gray-900 ',
        };
      default:
        return {
          ...state,
          paymentStatusColor:
            'dark:text-gray-50 dark:border-gray-50 border-gray-900 text-gray-900 ',
        };
      // throw new Error('paymentStatusColorReducer case error');
    }
  };

  const [state, dispatch] = useReducer(paymentStatusColorReducer, {
    paymentStatusColor: initialValue,
  });

  useEffect(() => dispatch({ type: status }), [status]);

  const { paymentStatusColor } = state;

  return { paymentStatusColor, state, dispatch };
};
export default usePaymentStatusColor;
