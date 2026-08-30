export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">
              Made by Indian Artisans
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Handcrafted with{' '}
            <span className="text-amber-600 relative">
              Love
              <svg className="absolute -bottom-1 left-0 w-full h-3 text-amber-300" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M2 8C40 2 100 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto mb-8">
            Discover unique pieces from skilled artisans across India. Every purchase supports local craftspeople and preserves traditional art forms.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {[
              { value: '500+', label: 'Artisans' },
              { value: '2000+', label: 'Products' },
              { value: '50K+', label: 'Happy Customers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-stone-900">{stat.value}</p>
                <p className="text-xs md:text-sm text-stone-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
