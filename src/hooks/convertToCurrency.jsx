

export const convertToCurrency = (val) => {
  return new Intl.NumberFormat('en').format(val);
};
