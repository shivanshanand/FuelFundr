import React, { useState } from "react";
import {
  Calendar,
  User,
  Edit2,
  UserCircle2,
  Award,
  Gift,
  Rocket,
  Users,
  Trophy,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { getInitials } from "../../utils/initials";

const defaultSocials = { linkedin: "", twitter: "", instagram: "" };

// Badge config map for icon, description, etc.
const BADGE_DETAILS = {
  "First Donation": {
    icon: <Gift className="w-8 h-8 text-yellow-400 animate-wiggle-slow" />,
    label: "First Donation",
    desc: "Made your very first donation. Welcome to the community!",
  },
  Contributor: {
    icon: <Users className="w-8 h-8 text-blue-400 animate-bounce" />,
    label: "Contributor",
    desc: "Made 3+ donations to support campaigns.",
  },
  Supporter: {
    icon: <Award className="w-8 h-8 text-green-400 animate-tada" />,
    label: "Supporter",
    desc: "Donated a total of ₹1,000 or more.",
  },
  Campaigner: {
    icon: <Rocket className="w-8 h-8 text-pink-400 animate-spin-slow" />,
    label: "Campaigner",
    desc: "Started your first campaign.",
  },
  Fundraiser: {
    icon: <Trophy className="w-8 h-8 text-orange-400 animate-bounce-slow" />,
    label: "Fundraiser",
    desc: "Started 3+ campaigns.",
  },
};

const Profile = ({ user }) => {
  const { updateProfile, isLoading } = useAuthStore();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [error, setError] = useState("");
  const initials = getInitials(user?.name);
  const [editingSocials, setEditingSocials] = useState(false);
  const [socials, setSocials] = useState(user?.socials || defaultSocials);
  const [socialError, setSocialError] = useState("");

  const handleBioSave = async () => {
    try {
      setError("");
      await updateProfile({ bio });
      setEditingBio(false);
    } catch {
      setError("Failed to update bio.");
    }
  };

  const handleSocialsSave = async () => {
    setSocialError("");
    try {
      await updateProfile({ socials });
      setEditingSocials(false);
    } catch {
      setSocialError("Failed to update socials. Please check links!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-10 w-full max-w-4xl min-h-[22rem] mx-auto glassy bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-200 dark:border-slate-800 relative">
      {/* Left: Avatar, name, email, bio, socials */}
      <div className="md:w-[270px] w-full flex flex-col items-center md:items-start gap-7">
        <div className="h-28 w-28 md:h-32 md:w-32 flex items-center justify-center rounded-full border-4 border-blue-300 dark:border-green-200 shadow-xl bg-gradient-to-br from-blue-200 to-green-200 dark:from-green-900 dark:to-blue-900 select-none">
          {initials ? (
            <span className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-green-200">
              {initials}
            </span>
          ) : (
            <UserCircle2 className="h-20 w-20 md:h-24 md:w-24 text-blue-700 dark:text-green-200" />
          )}
        </div>

        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-1">
            {user?.name || "Anonymous"}
          </h2>
          <div className="text-blue-700 dark:text-green-300 font-semibold break-all text-base">
            {user?.email}
          </div>
        </div>
        {/* Bio Section */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[1.04rem] font-semibold text-blue-700 dark:text-green-300">
              Bio
            </span>
            {!editingBio && (
              <button
                className="p-1 text-blue-700 dark:text-green-300 rounded hover:bg-blue-100 dark:hover:bg-green-900 transition"
                onClick={() => setEditingBio(true)}
                title="Edit bio"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {!editingBio ? (
            <div className="text-[.97rem] text-gray-600 dark:text-gray-300 bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800/50 dark:to-green-900/30 rounded-xl px-3 py-2 shadow-inner min-h-[48px]">
              {user?.bio?.trim() ? (
                user.bio
              ) : (
                <span className="italic text-gray-400">
                  No bio added. Click edit to add something!
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
                className="border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2 text-gray-900 dark:text-white"
                rows={3}
                maxLength={200}
                placeholder="Add a short description about you..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleBioSave}
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold shadow disabled:opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingBio(false);
                    setBio(user.bio || "");
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg border border-blue-300 dark:border-slate-700 text-blue-700 dark:text-green-200 bg-white dark:bg-slate-900"
                >
                  Cancel
                </button>
              </div>
              {error && (
                <div className="text-red-600 text-xs ml-1">{error}</div>
              )}
            </div>
          )}
        </div>
        {/* Socials Section */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[1.04rem] font-semibold text-blue-700 dark:text-green-300">
              Socials
            </span>
            {!editingSocials && (
              <button
                className="p-1 text-blue-700 dark:text-green-300 rounded hover:bg-blue-100 dark:hover:bg-green-900 transition"
                onClick={() => setEditingSocials(true)}
                title="Edit socials"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {!editingSocials ? (
            <div className="flex gap-4 mt-1 items-center">
              {user?.socials?.linkedin && (
                <a
                  href={user.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 text-blue-800 dark:text-green-200"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}
              {user?.socials?.twitter && (
                <a
                  href={user.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 text-blue-800 dark:text-green-200"
                  title="Twitter"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
              {user?.socials?.instagram && (
                <a
                  href={user.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 text-blue-800 dark:text-green-200"
                  title="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}
              {!user?.socials ||
              (!user.socials.linkedin &&
                !user.socials.twitter &&
                !user.socials.instagram) ? (
                <span className="italic text-gray-400 text-sm">
                  No socials connected.
                </span>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <input
                type="text"
                className="border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded p-2 text-gray-900 dark:text-white"
                placeholder="LinkedIn URL"
                value={socials.linkedin}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, linkedin: e.target.value }))
                }
                disabled={isLoading}
              />
              <input
                type="text"
                className="border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded p-2 text-gray-900 dark:text-white"
                placeholder="Twitter URL"
                value={socials.twitter}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, twitter: e.target.value }))
                }
                disabled={isLoading}
              />
              <input
                type="text"
                className="border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded p-2 text-gray-900 dark:text-white"
                placeholder="Instagram URL"
                value={socials.instagram}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, instagram: e.target.value }))
                }
                disabled={isLoading}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSocialsSave}
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold shadow disabled:opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingSocials(false);
                    setSocials(user?.socials || defaultSocials);
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg border border-blue-300 dark:border-slate-700 text-blue-700 dark:text-green-200 bg-white dark:bg-slate-900"
                >
                  Cancel
                </button>
              </div>
              {socialError && (
                <div className="text-red-600 text-xs ml-1">{socialError}</div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Right: Info Cards and Badges */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[180px] bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-900/80 dark:to-green-900/80 border border-blue-100 dark:border-green-900 px-7 py-5 rounded-xl flex items-center gap-3 shadow">
            <User className="w-7 h-7 text-blue-700 dark:text-green-300" />
            <div>
              <div className="text-blue-800 dark:text-green-200 font-semibold">
                Role
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {user?.role || "User"}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/80 dark:to-slate-900/80 border border-blue-100 dark:border-green-900 px-7 py-5 rounded-xl flex items-center gap-3 shadow">
            <span className="w-7 h-7 flex items-center justify-center text-xl text-green-400">
              <Calendar className="w-7 h-7" />
            </span>
            <div>
              <div className="text-blue-800 dark:text-green-200 font-semibold">
                Joined
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        {/* Badges */}
        {user?.badges?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-green-300 tracking-wide">
              Badges
            </h3>
            <div className="flex flex-wrap items-center gap-4 min-h-[70px]">
              {user?.badges.slice(0, 5).map((badge, idx) => {
                const badgeDetail = BADGE_DETAILS[badge] || {};
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-3 bg-gradient-to-r from-green-400 via-blue-400 to-blue-700
                 text-white px-6 py-3 text-base md:text-lg font-semibold
                 rounded-full shadow-lg hover:scale-105 transition border-2 border-white/40"
                    title={badgeDetail.desc || badge}
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {/* Show the actual icon for the badge */}
                    <span className="text-2xl drop-shadow-sm flex items-center">
                      {badgeDetail.icon || (
                        <Trophy className="w-8 h-8 text-yellow-400" />
                      )}
                    </span>
                    <span>{badgeDetail.label || badge}</span>
                  </span>
                );
              })}

              {user?.badges.length > 5 && (
                <span className="px-5 py-2 text-base rounded-full bg-blue-100 text-blue-700 dark:bg-slate-800 dark:text-green-300 font-bold shadow">
                  +{user.badges.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
