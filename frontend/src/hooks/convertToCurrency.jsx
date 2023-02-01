export const convertToCurrency = (val) =>
  new Intl.NumberFormat('en').format(val);

export default convertToCurrency;
