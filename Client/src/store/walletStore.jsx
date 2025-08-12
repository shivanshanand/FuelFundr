import { create } from "zustand";
import axios from "axios";

const WALLET_API = import.meta.env.VITE_API_URL;

export const useWalletStore = create((set) => ({
  walletBalance: 0,
  transactions: [],
  isLoading: false,
  error: null,

  fetchWalletBalance: async () => {
    try {
      const res = await axios.get(`${WALLET_API}/wallet/balance`, {
        withCredentials: true,
      });
      set({ walletBalance: res.data.walletBalance });
    } catch (err) {
      console.error("Fetch Wallet Balance Error", err);
    }
  },

  fetchTransactions: async () => {
    try {
      const res = await axios.get(`${WALLET_API}/wallet/transactions`, {
        withCredentials: true,
      });
      set({ transactions: res.data });
    } catch (err) {
      console.error("Fetch Transactions Error", err);
    }
  },

  addFunds: async (amount) => {
    set({ isLoading: true, error: null });

    try {
      // 1. Create Razorpay Order from backend
      const { data: order } = await axios.post(
        `${WALLET_API}/payment/create-order`,
        { amount },
        { withCredentials: true }
      );

      // 2. Return a promise that resolves/rejects on Razorpay events
      await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Capstone Wallet",
          description: "Add Wallet Funds",
          order_id: order.id,
          handler: async (response) => {
            try {
              // 3. Send payment data to backend for verification and wallet update
              const verifyRes = await axios.post(
                `${WALLET_API}/wallet/add-funds`,
                {
                  amount,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { withCredentials: true }
              );

              set({
                walletBalance: verifyRes.data.walletBalance,
                isLoading: false,
              });

              resolve(); // Important
            } catch (err) {
              console.error("Payment verification failed:", err);
              set({
                error: "Payment verified failed",
                isLoading: false,
              });
              reject(err);
            }
          },
          prefill: {
            name: "Capstone User",
            email: "user@example.com", // optional
          },
          theme: {
            color: "#0d6efd",
          },
          modal: {
            ondismiss: () => {
              set({ isLoading: false, error: "Payment cancelled" });
              reject(new Error("Payment cancelled by user"));
            },
          },
        });

        console.log("order details: ", amount, order.amount, order.id);

        razorpay.open();
      });
    } catch (err) {
      console.error("Add Funds Error", err);
      set({ isLoading: false, error: "Payment failed or cancelled" });
    }
  },
}));
