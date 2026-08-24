const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number) => formatter.format(price);

export const getDiscount = (price: number, originalPrice?: number) =>
  originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
