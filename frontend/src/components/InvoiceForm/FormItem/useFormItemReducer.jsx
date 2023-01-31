export const useFormItemReducer = () => {
  const itemReducer = (state, { type, payload }) => {
    switch (type) {
      case "itemPrice":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            price: payload.value,
          },
        };
      case "itemQuantity":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            quantity: +payload?.value >= 1 ? payload.value : "",
          },
        };
      case "itemName":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            name: payload.value,
          },
        };

      case "validatePrice":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            price:
              +payload.value >= 0.01
                ? parseFloat(state.formItem.price).toFixed(2)
                : 0.01,
          },
        };

      case "validateQuantity":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            quantity: +payload.value >= 1 ? +state.formItem.quantity : 1,
          },
        };

      case "itemTotal":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            total: +state.formItem.price * +state.formItem.quantity,
          },
        };
      case "itemId":
        return {
          ...state,
          formItem: {
            ...state.formItem,
            itemId: payload.itemId,
          },
        };
      case "resetItemForm":
        return {
          ...payload,
        };
      default:
        throw new Error("formItemReducer error");
    }
  };
  return { itemReducer };
};
