import { createContext, useReducer } from 'react';

export const InvoicesContext = createContext();

export const invoicesContextReducer = function (state, action) {
  console.log(state);
  switch (action.type) {
    case 'toggleInvoiceForm':
      return { ...state, showInvoiceForm: !state.showInvoiceForm };
    case 'hideInvoiceForm':
      return { ...state, showInvoiceForm: false };
    case 'setFilters':
      return {
        ...state,
        filters: [
          ...state.filters.filter((val) => val.filterValue !== action.payload),
          ...state.filters
            .filter((val) => val.filterValue === action.payload)
            .map((filter) => ({ ...filter, checked: !filter.checked })),
        ].sort((a, b) => b.id - a.id),
      };
    case 'updateSelectedFilters':
      return {};
    default:
      return state;
  }
};

export const InvoicesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoicesContextReducer, {
    showInvoiceForm: false,
    filters: [
      { id: 1, filterValue: 'paid', checked: false },
      { id: 2, filterValue: 'pending', checked: false },
      { id: 3, filterValue: 'draft', checked: false },
    ].sort((a, b) => b.id - a.id),
    selectedFilters: [],
  });

  return (
    <InvoicesContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoicesContext.Provider>
  );
};
