import WalletTransaction from "../models/WalletTransaction.js";
import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  const { type = "donation" } = req.query;
  const currentUserId = req.userId;

  try {
    if (type === "donation") {
      // 1. Aggregate all DONATION transactions, sum by userId, sorted descending
      const allAgg = await WalletTransaction.aggregate([
        { $match: { type: "DONATION" } },
        { $group: { _id: "$userId", totalDonated: { $sum: "$amount" } } },
        { $sort: { totalDonated: -1 } },
      ]);
      const leaderboardAgg = allAgg.slice(0, 10);

      // 2. Populate user info for top 10 and current user
      let extraIds = [];
      let currentUserRank = null,
        currentUserData = null;

      if (currentUserId) {
        const index = allAgg.findIndex(
          (row) => row._id.toString() === currentUserId.toString()
        );
        if (index >= 0 && index >= 10) {
          // Current user not in top 10, include their row
          currentUserRank = index + 1;
          extraIds = [currentUserId];
          currentUserData = allAgg[index];
        }
      }

      const userIds = leaderboardAgg.map((row) => row._id).concat(extraIds);
      const users = await User.find(
        { _id: { $in: userIds } },
        "name avatar"
      ).lean();

      // Build main leaderboard
      let leaderboard = leaderboardAgg.map((row, ix) => {
        const u = users.find((u) => u._id.toString() === row._id.toString());
        return {
          userId: row._id,
          name: u?.name || "Anonymous",
          avatar: u?.avatar || null,
          totalDonated: row.totalDonated,
          rank: ix + 1,
        };
      });

      // Add sticky current user if needed
      if (currentUserRank) {
        // Avoid duplication if user was in top 10 for future extension
        const userDoc = users.find(
          (u) => u._id.toString() === currentUserId.toString()
        );
        leaderboard.push({
          userId: currentUserId,
          name: userDoc?.name || "You",
          avatar: userDoc?.avatar || null,
          totalDonated: currentUserData.totalDonated,
          rank: currentUserRank,
        });
      }

      return res.json(leaderboard);
    }

    if (type === "badges") {
      const usersArr = await User.find({}, "name avatar badges");
      // Sorted by badge count descending
      const sorted = usersArr
        .map((u) => ({
          userId: u._id,
          name: u.name,
          avatar: u.avatar || null,
          badgeCount: u.badges?.length || 0,
        }))
        .sort((a, b) => b.badgeCount - a.badgeCount);

      const leaderboard = sorted.slice(0, 10);

      let currentUserRank;
      if (req.userId) {
        const index = sorted.findIndex(
          (u) => u.userId.toString() === req.userId.toString()
        );
        if (index >= 0 && index >= 10) {
          leaderboard.push({
            ...sorted[index],
            rank: index + 1,
          });
        }
      }
      return res.json(leaderboard);
    }

    return res.status(400).json({ message: "Invalid leaderboard type" });
  } catch (error) {
    console.error("Leaderboard error", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
