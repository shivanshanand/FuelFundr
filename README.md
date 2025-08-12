# FuelFundr – Crowdfunding Platform

A modern, full-stack student-centric crowdfunding platform where students can launch campaigns, backers can contribute securely, and everyone enjoys a polished, gamified experience with badges and celebratory modals.

- Create and manage campaigns
- Donate as authenticated users or guests
- Wallet with add-funds (Razorpay), withdrawals, balance and transactions
- Badges and achievement modals for key milestones
- Clean UI, responsive design, smooth state management

## Tech Stack

- Frontend: React, Zustand, TailwindCSS, Framer Motion, lucide-react, react-toastify, react-confetti
- Backend: Node.js, Express, Mongoose
- Payments: Razorpay
- Other: Axios, Cloudinary, Nodemailer

## Key Features

- Campaigns
  - Create, review, publish campaigns with title, description, target, deadline, image
  - Real-time progress: amount raised, backers, days remaining
  - Creator profile with campaign count and bio
- Donations
  - Auth donations via wallet balance
  - Guest donations via Razorpay (order + signature verify)
  - Donation success modal + live campaign refresh
- Wallet
  - Add funds via Razorpay
  - Withdraw campaign funds (creator only; keep-what-you-raise)
  - Transactions history with typed records (ADD_FUNDS, DONATION, WITHDRAWAL)
- Badges and Modals
  - Automatic badge evaluation on key events
    - First Donation, Contributor (3+ donations), Supporter (₹1000+ total donated)
    - Campaigner (first campaign), Fundraiser (3+ campaigns)
  - BadgeModal with icons, labels, descriptions, confetti, and manual close
- Robust UX
  - Wizard flow for campaign creation
  - Stepper with validation
  - Optimistic toasts and graceful error handling
  - Dark mode-ready styles

## Development Notes and Learnings

- Badge unlock correctness: capture badges before/after to safely compute newBadges
- Modal UX: avoid automatic dismissal when a manual close is desired; control navigation after modal close
- Zustand best practices: expose explicit actions (e.g., resetBadgeModal) rather than using internal set from components
- Payment verification: Razorpay HMAC signature checking on server to prevent spoofing
- Campaign fulfillment: set status to fulfilled when target met; optionally close when fully withdrawn

Made by **SHIVANSH ANAND** — a full‑stack developer who enjoys building clean, fast, and user‑friendly web apps.

---
