import { createContext, useReducer } from 'react';

export const InvoicesContext = createContext();

export const invoicesContextReducer = (state, action) => {
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
    case 'filterInvoices': {
      if (state.filters.length === 0) {
        return { ...state, filteredInvoices: action.payload };
      }
      // array of filter value strings
      const filterStringsArr = [];
      // Check for checked filters
      state.filters.forEach((val) => {
        // if filter is checked push to filterStringsArr
        if (val.checked) {
          filterStringsArr.push(val.filterValue);
        }
      });

      if (filterStringsArr.length === 0) {
        return {
          ...state,
          filteredInvoices: action.payload,
          checkedFilters: [...filterStringsArr],
        };
      }
      return {
        ...state,
        filteredInvoices: action.payload.filter((filterVal) =>
          filterStringsArr.includes(filterVal.status)
        ),
        checkedFilters: [...filterStringsArr],
      };
    }
    case 'clearFilters':
      return {
        ...state,
        filteredInvoices: [],
        checkedFilters: [],
        filters: [
          { id: 1, filterValue: 'paid', checked: false },
          { id: 2, filterValue: 'pending', checked: false },
          { id: 3, filterValue: 'quote', checked: false },
        ].sort((a, b) => b.id - a.id),
      };
    default:
      return state;
  }
};

export function InvoicesContextProvider({ children }) {
  const [state, dispatch] = useReducer(invoicesContextReducer, {
    showInvoiceForm: false,
    filters: [
      { id: 1, filterValue: 'paid', checked: false },
      { id: 2, filterValue: 'pending', checked: false },
      { id: 3, filterValue: 'quote', checked: false },
    ].sort((a, b) => b.id - a.id),
    filteredInvoices: [],
    checkedFilters: [],
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <InvoicesContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoicesContext.Provider>
  );
}
