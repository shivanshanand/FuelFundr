import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";

const AddFundsModal = ({ open, onClose, onAddFunds, isLoading }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleAdd = async () => {
    setError("");
    const amt = Number(amount);
    if (!amt || isNaN(amt) || amt < 1) {
      setError("Please enter a valid amount (minimum ₹1).");
      return;
    }
    await onAddFunds(amt);
    setAmount("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-6 select-none">
      <div className="relative w-full max-w-sm yc-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-650 hover:border-slate-300 dark:hover:text-white dark:hover:border-slate-800 transition cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6 text-center">
          Add Funds
        </h2>
        
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Amount (INR)
          </label>
          <input
            ref={inputRef}
            type="number"
            min="1"
            value={amount}
            disabled={isLoading}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono text-sm shadow-sm"
            placeholder="Enter amount (min ₹1)"
          />
          {error && (
            <div className="text-rose-500 text-xs font-semibold mt-1">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl font-bold text-white text-xs bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer shadow-sm shadow-indigo-600/10"
          >
            {isLoading ? "Processing..." : "Add Funds"}
          </button>
          
          <button
            onClick={() => {
              setAmount("");
              setError("");
              onClose();
            }}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-slate-350 transition cursor-pointer text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
