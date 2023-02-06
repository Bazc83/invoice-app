const itemReducer = (state, { type, payload }) => {
  switch (type) {
    case 'itemPrice':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          price: payload.value,
          total: +payload.value * +state.formItem.quantity,
        },
      };
    case 'itemQuantity':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          quantity: +payload.value >= 1 ? payload.value : '',
          total: +state.formItem.price * +payload.value,
        },
      };
    case 'itemName':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          name: payload.value,
        },
      };

    case 'validatePrice':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          price:
            +payload.value >= 0.01
              ? parseFloat(state.formItem.price).toFixed(2)
              : 0.01,
          total: +payload.value * +state.formItem.quantity,
        },
      };

    case 'validateQuantity':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          quantity: +payload.value >= 1 ? +state.formItem.quantity : 1,
          total: +state.formItem.price * +payload.value,
        },
      };

    case 'itemTotal':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          total: +state.formItem.price * +state.formItem.quantity,
        },
      };
    case 'itemId':
      return {
        ...state,
        formItem: {
          ...state.formItem,
          itemId: payload.itemId,
        },
      };
    case 'resetItemForm':
      return {
        ...payload,
      };
    default:
      throw new Error('formItemReducer error');
  }
};

export default itemReducer;
