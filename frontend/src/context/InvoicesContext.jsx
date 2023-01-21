import { createContext, useReducer } from 'react';

export const InvoicesContext = createContext();

export const invoicesContextReducer = function (state, action) {
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
    case 'filterInvoices':
      if (state.filters.length === 0) {
        return { ...state, filteredInvoices: action.payload };
      }
      // array of filter value strings
      const selectedFilters = [];

      // Check for checked filters
      state.filters.forEach((val) => {
        // if filter is checked push to selectedFilters
        if (val.checked) {
          selectedFilters.push(val.filterValue);
        }
      });

      if (selectedFilters.length === 0) {
        return { ...state, filteredInvoices: action.payload };
      } else {
        return {
          ...state,
          filteredInvoices: action.payload.filter((filterVal) =>
            selectedFilters.includes(filterVal.status)
          ),
        };
      }
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
    filteredInvoices: [],
  });

  return (
    <InvoicesContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoicesContext.Provider>
  );
};
