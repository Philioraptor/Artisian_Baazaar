import { useStore } from '../store/useStore';

export function Toast() {
  const toasts = useStore((s) => s.toasts);
  const dismissToast = useStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-medium max-w-[220px] truncate">{t.message}</span>
          <button onClick={() => dismissToast(t.id)} className="p-1 hover:bg-white/10 rounded-full ml-1">
            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
