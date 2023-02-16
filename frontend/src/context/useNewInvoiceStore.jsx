import { create } from 'zustand';

// const initialState = {
//   id: '',
//   companyName: '',
//   senderCity: '',
//   senderStreet: '',
//   senderPostCode: '',
//   senderCountry: '',
//   clientEmail: '',
//   clientName: '',
//   clientCity: '',
//   clientStreet: '',
//   clientCountry: '',
//   clientPostCode: '',
//   description: '',
//   invoiceDate: '',
//   createdAt: '',
//   paymentDue: '',
//   paymentTerms: 'Cash',
//   status: 'draft',
//   amountDueTotal: 0,
//   items: [],
// };
const initialState = {
  id: '',
  companyName: 'company name  ',
  senderCity: 'Lisburn',
  senderStreet: 'test',
  senderPostCode: 'test',
  senderCountry: 'test',
  clientEmail: 'test@test.com',
  clientName: 'test',
  clientCity: 'test',
  clientStreet: 'test',
  clientCountry: 'test',
  clientPostCode: 'test',
  description: 'test',
  createdAt: '',
  paymentDue: '',
  paymentTerms: 'Cash',
  status: 'draft',
  amountDueTotal: 0,
  items: [],
};

const useNewInvoiceStore = create((set) => ({
  invoiceData: initialState,
  addItem: (itemValue) =>
    set((state) => ({
      ...state,
      invoiceData: {
        ...state.invoiceData,
        items: [...state.invoiceData.items, itemValue],
      },
    })),
  updateItem: (itemValue) =>
    set((state) => {
      const itemIndex = state.invoiceData.items.findIndex(
        (indexVal) => indexVal.itemId === itemValue.itemId
      );

      if (itemIndex === -1)
        return {
          invoiceData: {
            ...state.invoiceData,
            items: [...state.invoiceData.items, itemValue],
          },
        };

      return {
        invoiceData: {
          ...state.invoiceData,
          items: [
            ...state.invoiceData.items.slice(0, itemIndex),
            itemValue,
            ...state.invoiceData.items.slice(itemIndex + 1),
          ],
        },
      };
    }),
  updateInvoiceId: (id) =>
    set((state) => ({ invoiceData: { ...state.invoiceData, id} })),
  updateCreatedAt: (dateVal) =>
    set((state) => ({
      invoiceData: { ...state.invoiceData, createdAt: dateVal },
    })),
  updatePaymentDue: (dateVal) =>
    set((state) => ({
      invoiceData: { ...state.invoiceData, paymentDue: dateVal },
    })),

  resetNewInvoice: () => set(() => initialState),
}));

export default useNewInvoiceStore;
