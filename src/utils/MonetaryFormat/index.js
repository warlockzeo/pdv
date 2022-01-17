export const MonetaryFormat = (val = 0) =>
  parseFloat(val).toFixed(2).replace(',', '.');
