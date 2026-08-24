import { memo, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import type { Category } from '../types';

const categories: Category[] = ['All', 'Furniture', 'Textiles', 'Pottery', 'Jewelry', 'Art'];

const categoryIcons: Record<Category, string> = {
  All: '✦',
  Furniture: '🪑',
  Textiles: '🧵',
  Pottery: '🏺',
  Jewelry: '💎',
  Art: '🎨',
};

export const CategoryFilter = memo(function CategoryFilter() {
  const selectedCategory = useStore((s) => s.selectedCategory);
  const setSelectedCategory = useStore((s) => s.setSelectedCategory);
  const searchQuery = useStore((s) => s.searchQuery);

  const counts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const base = q
      ? products.filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      : products;

    const map: Record<string, number> = { All: base.length };
    for (const cat of categories) {
      if (cat !== 'All') map[cat] = base.filter((p) => p.category === cat).length;
    }
    return map;
  }, [searchQuery]);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200 hover:border-stone-300'
          }`}
        >
          <span>{categoryIcons[category]}</span>
          <span className="hidden sm:inline">{category}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            selectedCategory === category ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
          }`}>
            {counts[category] || 0}
          </span>
        </button>
      ))}
    </div>
  );
});
