import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { formatPrice, getDiscount } from '../utils';
import { StarRating } from './StarRating';

export function ProductModal() {
  const selectedProduct = useStore((s) => s.selectedProduct);
  const setSelectedProduct = useStore((s) => s.setSelectedProduct);
  const addToCart = useStore((s) => s.addToCart);
  const setCartOpen = useStore((s) => s.setCartOpen);

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const discount = getDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedProduct(null)}
    >
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur hover:bg-white transition-colors shadow-md"
        >
          <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
              loading="eager"
            />
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <p className="text-xs text-amber-600 uppercase tracking-widest font-medium mb-2">
              {product.category}
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-stone-500">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed mb-4">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex-1" />

            <div className="border-t border-stone-100 pt-4 mt-auto">
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-stone-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                    Save {discount}%
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3.5 bg-amber-600 text-white font-semibold rounded-2xl hover:bg-amber-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
