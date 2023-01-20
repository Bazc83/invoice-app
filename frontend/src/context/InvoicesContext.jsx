import { createContext, useReducer } from 'react';

export const InvoicesContext = createContext();

export const invoicesContextReducer = (state, action) => {
  switch (action.type) {
    case 'toggleInvoiceForm':
      return { ...state, showInvoiceForm: !state.showInvoiceForm };
    case 'hideInvoiceForm':
      return { ...state, showInvoiceForm: false };
    default:
      return state;
  }
};

export const InvoicesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoicesContextReducer, {
    showInvoiceForm: false,
  });

  return (
    <InvoicesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InvoicesContext.Provider>
  );
};
