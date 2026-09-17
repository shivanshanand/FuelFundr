import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      toast.error("Please enter all 6 digits.");
      return;
    }
    try {
      await verifyEmail(code.join(""));
      toast.success("Email verified successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error("Verification failed. Please check the code and try again.");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200 px-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-sm w-full yc-card overflow-hidden shadow-xl p-8"
      >
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 text-center">
          Verify Email
        </h2>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Enter the 6-digit code sent to your email address.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 text-center text-lg font-black font-mono rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all duration-150"
                autoFocus={index === 0}
                inputMode="numeric"
              />
            ))}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all duration-150 disabled:opacity-60 cursor-pointer uppercase tracking-widest"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
