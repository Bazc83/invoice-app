import { create } from 'zustand';

const initialState = {
  filterModal: false,
  invoiceForm: false,
  mobileMenu: false,
};
const useModalStore = create((set) => ({
  ...initialState,
  toggleFilterModal: () =>
    set((state) => ({ filterModal: !state.filterModal })),

  toggleInvoiceForm: () =>
    set((state) => ({ invoiceForm: !state.invoiceForm })),
  toggleMobileMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),
  hideAllModals: () => set(() => ({ ...initialState })),
}));
export default useModalStore;
