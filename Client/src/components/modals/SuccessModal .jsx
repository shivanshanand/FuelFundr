import { X } from "lucide-react";

const SuccessModal = ({ open, onClose, amount }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-6 select-none">
      <div className="relative w-full max-w-sm yc-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 text-center flex flex-col items-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-650 hover:border-slate-300 dark:hover:text-white dark:hover:border-slate-800 transition cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-4xl mb-2 animate-bounce-custom">💸</span>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Funds Deposited!
        </h2>
        
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Successfully added <span className="font-mono font-black text-indigo-500">₹{amount?.toLocaleString()}</span> to your wallet balance.
        </p>
        
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
          Your balance has been updated and is ready to be used.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-bold text-white text-xs bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer uppercase tracking-widest"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
