import { createContext, useReducer } from "react";

export const InvoiceContext = createContext();

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "toggleEditForm":
      return { ...state, showEditForm: !state.showEditForm };
    case "hideEditForm":
      return { ...state, showEditForm: false };
    case "showEditForm":
      return { ...state, showEditForm: true };
    case "showDeleteModal":
      return { ...state, showDeleteModal: true };
    case "hideDeleteModal":
      return { ...state, showDeleteModal: false };
    case "setFormData":
      return {
        ...state,
        formData: action.payload,
      };
    case "setFormDataItems":
      return {
        ...state,
        formData: { ...state.formData, items: action.payload },
      };
    case "changeFormData":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    case "setPaymentTermsAndPaymentDueDate":
      return {
        ...state,
        formData: {
          ...state.formData,
          paymentTerms: action.payload.paymentTerms,
          paymentDue: action.payload.paymentDue,
        },
        showPaymentTermOptions: false,
      };
    case "toggleShowPaymentTermOptions":
      return {
        ...state,
        showPaymentTermOptions: !state.showPaymentTermOptions,
      };
    case "resetInvoice":
      return {
        showEditForm: false,
        showDeleteModal: false,
        formData: {},
        itemsArray: [],
        showPaymentTermOptions: false,
      };

    default:
      throw new Error("invoiceContextReducer error");
  }
};

export const InvoiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, {
    showEditForm: false,
    showDeleteModal: false,
    formData: {},
    itemsArray: [],
    showPaymentTermOptions: false,
  });

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};
