import { useMemo, useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { MockCheckout } from './components/MockCheckout';
import { Toast } from './components/Toast';
import { products } from './data/products';
import { useStore, type SortOption } from './store/useStore';

function App() {
  const selectedCategory = useStore((s) => s.selectedCategory);
  const searchQuery = useStore((s) => s.searchQuery);
  const sortBy = useStore((s) => s.sortBy);
  const setSortBy = useStore((s) => s.setSortBy);
  const checkoutVersion = useStore((s) => s.checkoutVersion);

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <CategoryFilter />
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm text-stone-600 bg-white border border-stone-200 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
            <p className="text-sm text-stone-500 flex-shrink-0">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-700 mb-1">No products found</h3>
            <p className="text-sm text-stone-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="font-bold text-stone-900">Artisan Bazaar</span>
              </div>
              <p className="text-sm text-stone-500">Connecting skilled Indian artisans with conscious consumers worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-700 mb-3 text-sm">Supporting</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Direct artisan partnerships</li>
                <li>• Fair trade practices</li>
                <li>• Sustainable materials</li>
                <li>• Preserving traditional crafts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-stone-700 mb-3 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>📍 Jaipur, Rajasthan, India</li>
                <li>📧 hello@artisanbazaar.in</li>
                <li>📞 +91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-100 mt-8 pt-6 text-center">
            <p className="text-xs text-stone-400">© 2026 Artisan Bazaar. Handcrafted with ❤️ in India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ProductModal />
      <CartDrawer />
      <MockCheckout key={checkoutVersion} />
      <Toast />

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-[60] w-10 h-10 bg-white border border-stone-200 rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 active:scale-95 transition-all"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
