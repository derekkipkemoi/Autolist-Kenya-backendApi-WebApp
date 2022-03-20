export const priceFormat = (value) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value);

export const numberFormat = (value) =>
  new Intl.NumberFormat('en-KE', {
    style: 'decimal'
  }).format(value);