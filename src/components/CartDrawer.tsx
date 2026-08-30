import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils';

export function CartDrawer() {
  const cart = useStore((s) => s.cart);
  const isCartOpen = useStore((s) => s.isCartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const setCheckoutOpen = useStore((s) => s.setCheckoutOpen);
  const checkoutComplete = useStore((s) => s.checkoutComplete);
  const setCheckoutComplete = useStore((s) => s.setCheckoutComplete);
  const clearCart = useStore((s) => s.clearCart);

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen, setCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
            <p className="text-sm text-stone-500">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-2 rounded-full hover:bg-stone-100 transition-colors">
            <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {checkoutComplete && (
          <div className="p-4 bg-emerald-50 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Order Placed Successfully! 🎉</p>
                <p className="text-xs text-emerald-600">Thank you for supporting Indian artisans.</p>
              </div>
            </div>
            <button
              onClick={() => { setCheckoutComplete(false); clearCart(); }}
              className="mt-3 text-xs font-medium text-emerald-700 hover:text-emerald-900 underline"
            >
              Start Shopping Again
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-stone-700 mb-1">Your cart is empty</h3>
              <p className="text-sm text-stone-500 max-w-xs">Explore our handcrafted collection and add something special.</p>
              <button onClick={() => setCartOpen(false)} className="mt-4 px-6 py-2 bg-amber-600 text-white text-sm font-medium rounded-full hover:bg-amber-700 transition-colors">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-stone-50 rounded-xl p-3">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" loading="lazy" decoding="async" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-stone-900 truncate">{item.product.name}</h4>
                    <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">{item.product.category}</p>
                    <p className="text-sm font-bold text-stone-900 mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-stone-100 rounded-l-lg transition-colors">
                          <svg className="w-3.5 h-3.5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-sm font-medium text-stone-900 w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-stone-100 rounded-r-lg transition-colors">
                          <svg className="w-3.5 h-3.5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && !checkoutComplete && (
          <div className="p-5 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Subtotal</span>
              <span className="text-lg font-bold text-stone-900">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-stone-400">Shipping & taxes calculated at checkout</p>
            <button
              onClick={() => { setCheckoutOpen(true); setCartOpen(false); }}
              className="w-full py-3.5 bg-amber-600 text-white font-semibold rounded-2xl hover:bg-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-600/25"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
