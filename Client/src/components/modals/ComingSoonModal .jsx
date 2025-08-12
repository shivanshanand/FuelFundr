const ComingSoonModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 py-6">
      <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-2xl border-4 border-blue-400 max-w-sm w-full px-6 py-9 text-center flex flex-col items-center animate-in zoom-in fade-in mx-auto relative">
        <button
          className="absolute top-3 right-4 text-2xl text-blue-700 dark:text-green-300 hover:text-red-500 transition"
          onClick={onClose}
        >
          ×
        </button>
        <span className="text-[2.25rem] sm:text-[2.75rem] mb-2 animate-bounce">
          🚧
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight mb-4">
          Coming Soon!
        </h2>
        <p className="text-lg text-gray-700 dark:text-green-100 mb-3">
          Our community features will launch soon.
          <br />
          Stay tuned!
        </p>
        <button
          onClick={onClose}
          className="mt-2 inline-flex justify-center items-center px-7 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-500 transition text-base sm:text-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
