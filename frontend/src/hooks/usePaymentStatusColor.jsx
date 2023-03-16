import { useEffect, useReducer } from 'react';

const usePaymentStatusColor = (status) => {
  const initialValue =
    'bg-skin-quote text-skin-quote-darker';

  const paymentStatusColorReducer = (state, action) => {
    switch (action.type) {
      case 'paid':
        return {
          ...state,
          paymentStatusColor: 'text-skin-brand-text bg-skin-brand-lighter',
        };
      case 'pending':
        return {
          ...state,
          paymentStatusColor: 'text-skin-pending bg-skin-pending-bg ',
        };
      default:
        return {
          ...state,
          paymentStatusColor: 'bg-skin-quote-bg text-skin-quote',
        };
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
