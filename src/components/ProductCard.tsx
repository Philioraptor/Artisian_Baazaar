import { memo, useCallback } from 'react';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { formatPrice, getDiscount } from '../utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((s) => s.addToCart);
  const setSelectedProduct = useStore((s) => s.setSelectedProduct);

  const discount = getDiscount(product.price, product.originalPrice);

  const onAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product);
    },
    [addToCart, product]
  );

  const onOpen = useCallback(
    () => setSelectedProduct(product),
    [setSelectedProduct, product]
  );

  return (
    <div
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 contain-strict"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 420px' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={onOpen}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
            <span className="bg-white text-stone-900 text-sm font-semibold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{product.category}</p>
        <h3
          className="font-semibold text-stone-900 text-sm leading-snug mb-2 cursor-pointer hover:text-amber-700 transition-colors line-clamp-2"
          onClick={onOpen}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-stone-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-stone-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={onAdd}
            disabled={!product.inStock}
            className="p-2.5 rounded-xl bg-amber-600 text-white hover:bg-amber-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-amber-600/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});
