import { createContext, useReducer } from 'react';

export const InvoiceContext = createContext();

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'toggleEditForm':
      return { ...state, showEditForm: !state.showEditForm };
    case 'hideEditForm':
      return { ...state, showEditForm: false };
    case 'showEditForm':
      return { ...state, showEditForm: true };
    case 'showDeleteModal':
      return { ...state, showDeleteModal: true };
    case 'hideDeleteModal':
      return { ...state, showDeleteModal: false };
    case 'setFormData':
      return {
        ...state,
        formData: action.payload,
      };
    case 'setFormDataItems':
      return {
        ...state,
        formData: { ...state.formData, items: action.payload },
      };
    case 'changeFormData':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    case 'setFormDataPaymentTerms':
      return {
        ...state,
        formData: {
          ...state.formData,
          paymentTerms: action.payload,
        },
      };
    case 'setFormDataPaymentDueDate':
      return {
        ...state,
        formData: {
          ...state.formData,
          paymentDue: action.payload,
        },
      };
    default:
      throw new Error('invoiceContextReducer error');
  }
};

export const InvoiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, {
    showEditForm: false,
    showDeleteModal: false,
    formData: {},
    itemsArray: [],
  });

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};
