export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] select-none">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-indigo-550/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Loading FuelFundr...
        </span>
      </div>
    </div>
  );
}
