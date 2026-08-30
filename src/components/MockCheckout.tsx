import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils';

export function MockCheckout() {
  const isCheckoutOpen = useStore((s) => s.isCheckoutOpen);
  const setCheckoutOpen = useStore((s) => s.setCheckoutOpen);
  const cart = useStore((s) => s.cart);
  const setCheckoutComplete = useStore((s) => s.setCheckoutComplete);
  const clearCart = useStore((s) => s.clearCart);
  const [step, setStep] = useState<'form' | 'processing' | 'done'>('form');
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const [orderId] = useState(() => `ART-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  useEffect(() => {
    if (!isCheckoutOpen || step === 'processing') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCheckoutOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isCheckoutOpen, step, setCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('done');
      setTimeout(() => {
        setCheckoutComplete(true);
        clearCart();
        setCheckoutOpen(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => {
      if (step !== 'processing') setCheckoutOpen(false);
    }}>
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'form' && (
          <>
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Checkout</h2>
                  <p className="text-sm text-stone-500">Complete your order</p>
                </div>
                <button onClick={() => setCheckoutOpen(false)} className="p-2 rounded-full hover:bg-stone-100 transition-colors">
                  <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                <input type="text" required placeholder="Priya Sharma" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input type="email" required placeholder="priya@example.com" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                <input type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Delivery Address</label>
                <textarea required rows={3} placeholder="123, Green Park Colony, New Delhi - 110016" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI', 'Card', 'COD'].map((method) => (
                    <label key={method} className="flex items-center justify-center gap-2 p-3 border border-stone-200 rounded-xl cursor-pointer hover:border-amber-500 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 transition-all">
                      <input type="radio" name="payment" value={method} defaultChecked={method === 'UPI'} className="sr-only" />
                      <span className="text-sm font-medium text-stone-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 mt-4">
                <h4 className="text-sm font-semibold text-stone-700 mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <span className="text-stone-600 truncate mr-2">{item.product.name} × {item.quantity}</span>
                      <span className="text-stone-900 font-medium flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-stone-200 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-700">Total</span>
                      <span className="text-lg font-bold text-stone-900">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-amber-600 text-white font-semibold rounded-2xl hover:bg-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Place Order — {formatPrice(total)}
              </button>

              <p className="text-[11px] text-stone-400 text-center">🔒 This is a demo checkout. No real payment will be processed.</p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-6" />
            <h3 className="text-lg font-bold text-stone-900 mb-2">Processing your order...</h3>
            <p className="text-sm text-stone-500">Please don't close this window</p>
          </div>
        )}

        {step === 'done' && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Order Confirmed! 🎉</h3>
            <p className="text-sm text-stone-500 mb-1">Thank you for supporting local artisans.</p>
            <p className="text-xs text-stone-400">Your order ID: {orderId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
