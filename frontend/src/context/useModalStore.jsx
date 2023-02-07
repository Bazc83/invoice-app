import { create } from 'zustand';

const initialState = {
  filterModal: false,
  newInvoiceForm: false,
  editInvoiceForm: false,
  mobileMenu: false,
  confirmationModal: false,
  deleteModal: false,
};
const useModalStore = create((set) => ({
  ...initialState,

  // Toggle modals
  toggleFilterModal: () =>
    set((state) => ({ filterModal: !state.filterModal })),
  toggleDeleteModal: () =>
    set((state) => ({ deleteModal: !state.deleteModal })),
  toggleNewInvoiceForm: () =>
    set((state) => ({ newInvoiceForm: !state.newInvoiceForm })),
  toggleEditInvoiceForm: () =>
    set((state) => ({ editInvoiceForm: !state.editInvoiceForm })),
  toggleMobileMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),
  toggleConfirmationModal: () =>
    set((state) => ({ confirmationModal: !state.confirmationModal })),

  // Show modals
  showConfirmationModal: () => set(() => ({ confirmationModal: true })),
  showMobileMenu: () => set(() => ({ mobileMenu: true })),
  showNewInvoiceForm: () => set(() => ({ newInvoiceForm: true })),
  showEditInvoiceForm: () => set(() => ({ editInvoiceForm: true })),
  showDeleteModal: () => set(() => ({ deleteModal: true })),

  // Hide modals
  hideConfirmationModal: () => set(() => ({ confirmationModal: false })),
  hideNewInvoiceForm: () => set(() => ({ newInvoiceForm: false })),
  hideEditInvoiceForm: () => set(() => ({ editInvoiceForm: false })),
  hideMobileMenu: () => set(() => ({ mobileMenu: false })),
  hideDeleteModal: () => set(() => ({ deleteModal: false })),
  hideAllModals: () => set(() => ({ ...initialState })),
}));
export default useModalStore;
