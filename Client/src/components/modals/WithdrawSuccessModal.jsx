import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const WithdrawSuccessModal = ({ show, amount, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-2 py-6 sm:py-0">
      <Confetti width={dimensions.width} height={dimensions.height} />
      <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-2xl border-4 border-green-400 max-w-sm w-full px-4 sm:px-7 py-7 sm:py-8 text-center flex flex-col items-center animate-in zoom-in fade-in mx-auto">
        <span className="text-[2.25rem] sm:text-[3rem] mb-1 -mt-2 sm:-mt-3 animate-bounce">
          🎉
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent tracking-tight mb-3">
          Withdrawal Successful!
        </h2>
        <div className="my-2 text-lg sm:text-xl font-bold">
          You withdrew{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent">
            ₹{amount}
          </span>
        </div>
        <div className="text-gray-700 dark:text-gray-200 mb-7 font-medium">
          to your wallet
        </div>
        <button
          className="inline-flex justify-center items-center px-7 sm:px-8 py-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-400 text-white font-bold shadow hover:from-green-600 hover:to-blue-700 transition text-base sm:text-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WithdrawSuccessModal;
