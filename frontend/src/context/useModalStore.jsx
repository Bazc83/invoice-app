import { create } from 'zustand';

const initialState = {
  filterModal: false,
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
  
  toggleMobileMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),
  toggleConfirmationModal: () =>
    set((state) => ({ confirmationModal: !state.confirmationModal })),

  // Show modals
  showConfirmationModal: () => set(() => ({ confirmationModal: true })),
  showMobileMenu: () => set(() => ({ mobileMenu: true })),

  showDeleteModal: () => set(() => ({ deleteModal: true })),

  // Hide modals
  hideConfirmationModal: () => set(() => ({ confirmationModal: false })),

  hideMobileMenu: () => set(() => ({ mobileMenu: false })),
  hideDeleteModal: () => set(() => ({ deleteModal: false })),
  hideAllModals: () => set(() => ({ ...initialState })),
}));
export default useModalStore;
