import { create } from 'zustand';

const initialState = {
  itemData: {
    itemId: '',
    name: '',
    quantity: 1,
    price: '0.01',
    total: 0.0,
  },
  priceError: false,
  quantityError: false,
  nameError: false,
};

const useNewItemStore = create((set) => ({
  ...initialState,

  updateItemId: (id) => {
    set((state) => ({ itemData: { ...state.itemData, itemId: id } }));
  },

  updateName: (name) => {
    set((state) => ({
      itemData: { ...state.itemData, name },
    }));
  },

  validateName: (name) => {
    set(() => ({
      nameError: name === '',
    }));
  },

  updateQuantity: (quantity) => {
    set((state) => ({
      itemData: {
        ...state.itemData,
        quantity,
      },
    }));
  },

  validateQuantity: (quantity) =>
    set(() => ({ quantityError: !(+quantity >= 1) })),

  updatePrice: (price) => {
    set((state) => ({
      itemData: {
        ...state.itemData,
        price,
      },
    }));
  },

  validatePrice: (price) =>
    set((state) => ({
      itemData: {
        ...state.itemData,
        price: +price >= 0.01 ? parseFloat(price).toFixed(2) : price,
      },
      priceError: !(+price >= 0.01),
    })),

  setTotal: () =>
    set((state) => ({
      itemData: {
        ...state.itemData,
        total: +state.itemData.price * +state.itemData.quantity,
      },
    })),
  resetItemData: () => {
    set(() => initialState);
  },
}));

export default useNewItemStore;
