import React, { useRef, useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 py-8 sm:py-0">
      <div className="relative w-full max-w-md sm:rounded-2xl rounded-xl shadow-2xl border border-blue-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/90 p-5 sm:p-8 glassy-modal mx-auto">
        <button
          className="absolute top-4 right-5 text-3xl font-bold text-blue-700 dark:text-green-300 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold mb-5 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight drop-shadow">
          Add Funds to Wallet
        </h2>
        <label className="block mb-2 font-semibold text-blue-700 dark:text-green-200 text-lg tracking-wide">
          Amount (₹)
        </label>
        <input
          ref={inputRef}
          type="number"
          min="1"
          value={amount}
          disabled={isLoading}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-2 py-3 px-4 rounded-lg border border-blue-200 dark:border-green-900 bg-white/90 dark:bg-slate-800/90 focus:ring-2 focus:ring-blue-300 dark:focus:ring-green-400 text-blue-900 dark:text-green-100 text-lg font-medium shadow"
          placeholder="Enter amount (minimum 1)"
        />
        {error && (
          <div className="text-red-600 text-base font-semibold mb-3">
            {error}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="flex-1 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-700 active:scale-95 transition"
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
            className="flex-1 py-2 border border-blue-300 dark:border-green-700 text-blue-800 dark:text-green-200 bg-blue-50/80 dark:bg-slate-800/80 rounded-xl text-lg font-semibold hover:bg-blue-100 dark:hover:bg-green-900 transition"
          >
            Cancel
          </button>
        </div>
      </div>
      <style>
        {`
        .glassy-modal {
          box-shadow: 0 8px 40px 0 rgb(34 157 237 / 18%);
        }
        `}
      </style>
    </div>
  );
};

export default AddFundsModal;
