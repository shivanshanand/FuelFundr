import { create } from "zustand";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const useLeaderboardStore = create((set) => ({
  type: "donation", // 'donation' or 'badges'
  leaders: [],
  isLoading: false,

  fetchLeaders: async (type = "donation") => {
    set({ isLoading: true, type });
    const res = await axios.get(`${API}/leaderboard?type=${type}`, {
      withCredentials: true,
    });
    set({ leaders: res.data, isLoading: false });
  },
}));
