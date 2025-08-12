const SuccessModal = ({ open, onClose, amount }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-2 py-6 sm:py-0">
      <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-2xl border-4 border-blue-400 max-w-sm w-full px-4 sm:px-7 py-7 sm:py-8 text-center flex flex-col items-center animate-in zoom-in fade-in mx-auto relative">
        <button
          className="absolute top-3 right-5 text-2xl text-blue-700 dark:text-green-300 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <span className="text-[2.5rem] sm:text-[3rem] mb-2 animate-bounce">
          💸
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight mb-3">
          Funds Added!
        </h2>
        <div className="my-2 text-white text-lg sm:text-xl font-bold">
          You added{" "}
          <span className="bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            ₹{amount}
          </span>{" "}
          to your wallet
        </div>
        <div className="text-gray-700 dark:text-gray-200 mb-7">
          Money successfully credited.
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
