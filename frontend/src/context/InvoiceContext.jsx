import { createContext, useReducer } from 'react';

export const InvoiceContext = createContext();

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'toggleEditForm':
      return { ...state, showEditForm: !state.showEditForm};
    case 'hideEditForm':
      return { ...state, showEditForm: false };
    case 'showEditForm':
      return { ...state, showEditForm: true };
    default:
       throw new Error("invoiceContextReducer error")
  }
};

export const InvoiceContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(invoiceReducer, {
    showEditForm: false,
  });

  return (
    <InvoiceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};
