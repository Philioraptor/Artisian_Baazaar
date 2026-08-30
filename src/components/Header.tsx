import { memo, useCallback } from 'react';
import { useStore } from '../store/useStore';

const SearchInput = memo(function SearchInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search handcrafted products..."
        className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-full text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
      />
    </div>
  );
});

export const Header = memo(function Header() {
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cartCount = useStore((s) => s.cart.reduce((c, i) => c + i.quantity, 0));
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    [setSearchQuery]
  );

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900 leading-tight">Artisan Bazaar</h1>
              <p className="text-[10px] text-stone-500 tracking-widest uppercase -mt-0.5">Handcrafted India</p>
            </div>
          </div>

          <SearchInput value={searchQuery} onChange={onSearch} className="hidden sm:flex flex-1 max-w-md mx-8" />

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-stone-100 transition-colors group"
          >
            <svg className="w-6 h-6 text-stone-600 group-hover:text-stone-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <SearchInput value={searchQuery} onChange={onSearch} className="sm:hidden pb-3" />
      </div>
    </header>
  );
});
