// campaignStore.js
import { create } from "zustand";
import axios from "axios";
import { useWalletStore } from "./walletStore";

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const useCampaignStore = create((set) => ({
  campaigns: [],
  currentCampaign: [],
  isLoading: false,
  error: null,
  badgeModalVisible: false,
  unlockedBadges: [],

  resetBadgeModal: () => set({ badgeModalVisible: false, unlockedBadges: [] }),

  // Fetch all campaigns
  fetchCampaigns: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/campaigns`);
      set({ campaigns: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Error fetching campaigns",
        isLoading: false,
      });
    }
  },

  // Get a specific campaign by ID
  fetchCampaignById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/campaigns/${id}`);
      set({ currentCampaign: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Error loading campaign",
        isLoading: false,
      });
    }
  },

  // Create a campaign
  createCampaign: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/campaigns/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });

      // If newBadge(s) present in response, show modal!
      if (response.data?.newBadges && response.data.newBadges.length > 0) {
        set({
          badgeModalVisible: true,
          unlockedBadges: response.data.newBadges,
        });
      }
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create campaign",
      });
      throw error;
    }
  },

  // Donate to a campaign
  donateToCampaign: async (campaignId, amount) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${API_URL}/campaigns/${campaignId}/donate`,
        {
          amount,
        }
      );
      useWalletStore.getState().fetchWalletBalance();
      useWalletStore.getState().fetchTransactions();

      if (res.data.newBadges?.length) {
        console.log("New Badges returned:", res.data.newBadges); // <--- Debug!

        set({
          badgeModalVisible: true,
          unlockedBadges: res.data.newBadges,
        });
      }

      set({ isLoading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Donation failed",
        isLoading: false,
      });
      throw err;
    }
  },

  // In your campaignStore.js
  guestDonateToCampaign: async (
    campaignId,
    amount,
    donorName = "",
    donorEmail = ""
  ) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Create Razorpay order for guest
      const { data: order } = await axios.post(
        `${API_URL}/payment/create-order-guest`,
        { amount }
      );

      // 2. Trigger Razorpay checkout
      await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "FuelFundr Donation",
          description: "Back Campaign",
          order_id: order.id,
          handler: async (response) => {
            try {
              // 3. After payment, tell backend to verify and record donation
              await axios.post(
                `${API_URL}/campaigns/${campaignId}/donate-guest`,
                {
                  amount,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  donorName,
                  donorEmail,
                }
              );
              set({ isLoading: false });
              resolve();
            } catch (err) {
              set({
                error: err.response?.data?.message || "Donation failed",
                isLoading: false,
              });
              reject(err);
            }
          },
          modal: {
            ondismiss: () => {
              set({ isLoading: false, error: "Payment cancelled" });
              reject(new Error("Payment cancelled by user"));
            },
          },
        });
        razorpay.open();
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Donation failed",
        isLoading: false,
      });
      throw err;
    }
  },

  // Withdraw funds from own campaign
  withdrawFromCampaign: async (campaignId, amount) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${API_URL}/campaigns/${campaignId}/withdraw`,
        {
          amount,
        }
      );
      set({ isLoading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Withdrawal failed",
        isLoading: false,
      });
      throw err;
    }
  },
}));
