import { useState } from "react";
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

const BADGE_DETAILS = {
  "First Donation": {
    icon: <Gift className="w-5 h-5 text-indigo-500" />,
    label: "First Donation",
    desc: "Made your very first donation. Welcome to the community!",
  },
  Contributor: {
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    label: "Contributor",
    desc: "Made 3+ donations to support campaigns.",
  },
  Supporter: {
    icon: <Award className="w-5 h-5 text-indigo-500" />,
    label: "Supporter",
    desc: "Donated a total of ₹1,000 or more.",
  },
  Campaigner: {
    icon: <Rocket className="w-5 h-5 text-indigo-500" />,
    label: "Campaigner",
    desc: "Started your first campaign.",
  },
  Fundraiser: {
    icon: <Trophy className="w-5 h-5 text-indigo-500" />,
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
      setSocialError("Failed to update socials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-10 w-full max-w-4xl mx-auto yc-card p-8 md:p-10 select-none">
      {/* Left Column */}
      <div className="md:w-[260px] w-full flex flex-col items-center md:items-start gap-6 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-white/5 pb-8 md:pb-0 md:pr-10 shrink-0">
        <div className="h-24 w-24 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 select-none">
          {initials ? (
            <span className="text-3xl font-black text-slate-800 dark:text-white">
              {initials}
            </span>
          ) : (
            <UserCircle2 className="h-16 w-16 text-slate-400" />
          )}
        </div>

        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1 truncate max-w-full">
            {user?.name || "Anonymous User"}
          </h2>
          <div className="text-xs font-mono text-slate-400 dark:text-slate-500 break-all">
            {user?.email}
          </div>
        </div>

        {/* Bio Section */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Bio Description
            </span>
            {!editingBio && (
              <button
                className="p-1 text-slate-450 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition cursor-pointer"
                onClick={() => setEditingBio(true)}
                title="Edit bio"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {!editingBio ? (
            <div className="text-sm text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-white/5 rounded-xl px-4 py-3 min-h-[48px]">
              {user?.bio?.trim() ? (
                user.bio
              ) : (
                <span className="italic text-slate-400 dark:text-slate-500 text-xs">
                  No bio details added. Click edit to add.
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500 resize-none"
                rows={3}
                maxLength={200}
                placeholder="Write a brief profile description..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleBioSave}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingBio(false);
                    setBio(user.bio || "");
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
              {error && (
                <div className="text-rose-500 text-[10px] font-semibold">{error}</div>
              )}
            </div>
          )}
        </div>

        {/* Socials Section */}
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Social Links
            </span>
            {!editingSocials && (
              <button
                className="p-1 text-slate-450 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition cursor-pointer"
                onClick={() => setEditingSocials(true)}
                title="Edit socials"
              >
                <Edit2 className="w-3.5 h-3.5" />
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
                  className="text-slate-550 dark:text-slate-400 hover:text-indigo-550 dark:hover:text-indigo-400 transition"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {user?.socials?.twitter && (
                <a
                  href={user.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-550 dark:text-slate-400 hover:text-indigo-450 dark:hover:text-indigo-400 transition"
                  title="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
              {user?.socials?.instagram && (
                <a
                  href={user.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-550 dark:text-slate-400 hover:text-rose-550 dark:hover:text-rose-450 transition"
                  title="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {!user?.socials ||
              (!user.socials.linkedin &&
                !user.socials.twitter &&
                !user.socials.instagram) ? (
                <span className="italic text-slate-400 dark:text-slate-500 text-xs">
                  No socials connected.
                </span>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <input
                type="text"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                placeholder="LinkedIn Profile URL"
                value={socials.linkedin || ""}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, linkedin: e.target.value }))
                }
                disabled={isLoading}
              />
              <input
                type="text"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                placeholder="Twitter Profile URL"
                value={socials.twitter || ""}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, twitter: e.target.value }))
                }
                disabled={isLoading}
              />
              <input
                type="text"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                placeholder="Instagram Profile URL"
                value={socials.instagram || ""}
                onChange={(e) =>
                  setSocials((s) => ({ ...s, instagram: e.target.value }))
                }
                disabled={isLoading}
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSocialsSave}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingSocials(false);
                    setSocials(user?.socials || defaultSocials);
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-[10px] font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
              {socialError && (
                <div className="text-rose-500 text-[10px] font-semibold">{socialError}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-grow w-full flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="yc-card bg-slate-50/50 dark:bg-slate-950/20 px-5 py-4 border border-slate-200/50 dark:border-white/5 flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Role</div>
              <div className="text-slate-800 dark:text-slate-200 text-sm font-bold leading-tight">
                {user?.role || "User"}
              </div>
            </div>
          </div>

          <div className="yc-card bg-slate-50/50 dark:bg-slate-950/20 px-5 py-4 border border-slate-200/50 dark:border-white/5 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Joined</div>
              <div className="text-slate-800 dark:text-slate-200 text-sm font-bold leading-tight font-mono">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Badges section */}
        {user?.badges?.length > 0 && (
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              My Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              {user?.badges.slice(0, 5).map((badge, idx) => {
                const badgeDetail = BADGE_DETAILS[badge] || {};
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:border-indigo-500 transition-all duration-200"
                    title={badgeDetail.desc || badge}
                  >
                    <div className="shrink-0 flex items-center justify-center">
                      {badgeDetail.icon || <Trophy className="w-5 h-5 text-indigo-500" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {badgeDetail.label || badge}
                    </span>
                  </div>
                );
              })}

              {user?.badges.length > 5 && (
                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shadow-sm flex items-center justify-center">
                  +{user.badges.length - 5} More
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
