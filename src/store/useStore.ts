import { create } from 'zustand';
import type { CartItem, Product, Category } from '../types';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

export interface Toast {
  id: number;
  message: string;
}

let toastId = 0;

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Filters
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string) => void;
  dismissToast: (id: number) => void;

  // Checkout
  checkoutComplete: boolean;
  setCheckoutComplete: (complete: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Cart
  cart: [],
  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    });
    // Show toast outside set to avoid batching issues
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, message: `${product.name} added to cart` }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2500);
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((i) => i.product.id !== productId)
        : state.cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cart: [] }),

  // Filters
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  sortBy: 'featured',
  setSortBy: (sort) => set({ sortBy: sort }),

  // UI State
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  isCheckoutOpen: false,
  setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),

  // Toast
  toasts: [],
  showToast: (message) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2500);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // Checkout
  checkoutComplete: false,
  setCheckoutComplete: (complete) => set({ checkoutComplete: complete }),
}));
