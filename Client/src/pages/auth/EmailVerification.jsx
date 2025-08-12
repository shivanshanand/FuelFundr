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

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
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

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -38 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-900/80 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 dark:border-slate-800 p-8 w-full max-w-md overflow-hidden"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-base">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
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
                className={`
                  w-12 h-12 text-center text-2xl font-extrabold
                  rounded-xl shadow-sm
                  border-2
                  bg-white/70 dark:bg-slate-800/70
                  border-gray-300 dark:border-slate-700
                  text-blue-700 dark:text-green-400
                  focus:border-green-500 focus:ring-2 focus:ring-green-300
                  transition-all duration-200
                  outline-none
                `}
                autoFocus={index === 0}
                inputMode="numeric"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-blue-800 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default EmailVerification;
