import { createContext, useReducer } from 'react';

export const InvoiceContext = createContext();

const initialValue = {
  showEditForm: false,
  showDeleteModal: false,
  showConfirmationModal: false,
  invoiceId: '',
  formData: {},
  itemsArray: [],
  showPaymentTermOptions: false,
};

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'hideEditForm':
      return { ...state, showEditForm: false };
    case 'showEditForm':
      return { ...state, showEditForm: true };
    case 'showDeleteModal':
      return { ...state, showDeleteModal: true };
    case 'showConfirmation':
      return { ...state, showConfirmationModal: true };
    case 'hideConfirmation':
      return { ...state, showConfirmationModal: false };
    case 'hideDeleteModal':
      return { ...state, showDeleteModal: false };
    case 'setFormData':
      return {
        ...state,
        formData: action.payload,
      };
    case 'addItems':
      return {
        ...state,
        itemsArray: [...action.payload],
      };
    case 'addItem':
      return {
        ...state,
        itemsArray: [...state.itemsArray, action.payload],
      };
    case 'updateItem': {
      const itemIndex = state.itemsArray.findIndex(
        (indexVal) => indexVal.itemId === action.payload.itemId
      );

      if (itemIndex !== -1) {
        return {
          ...state,
          itemsArray: [
            ...state.itemsArray.slice(0, itemIndex),
            action.payload,
            ...state.itemsArray.slice(itemIndex + 1),
          ],
        };
      }
      return { ...state };
    }
    case 'deleteItem':
      return {
        ...state,
        itemsArray: [
          ...state.itemsArray.filter((item) => item.itemId !== action.payload),
        ],
      };

    case 'changeFormData':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    case 'setPaymentTermsAndPaymentDueDate':
      return {
        ...state,
        formData: {
          ...state.formData,
          paymentTerms: action.payload.paymentTerms,
          paymentDue: action.payload.paymentDue,
        },
        showPaymentTermOptions: false,
      };
    case 'toggleShowPaymentTermOptions':
      return {
        ...state,
        showPaymentTermOptions: !state.showPaymentTermOptions,
      };
    case 'resetInvoice':
      return {
        ...initialValue,
      };

    default:
      throw new Error('invoiceContextReducer error');
  }
};

export function InvoiceContextProvider({ children }) {
  const [state, dispatch] = useReducer(invoiceReducer, initialValue);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
}
