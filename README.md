# 🚀 FuelFundr – AI-Powered Student Crowdfunding Platform

**FuelFundr** is a production-ready, full-stack student-centric crowdfunding platform. Built with a modern microservices architecture, FuelFundr features AI-assisted campaign content creation, gamified achievement badges, a real-time leaderboard, internal digital wallets, and secure Razorpay payment gateway integration.

---

## 🌟 Key Features & Highlights

### 🤖 1. AI-Powered Campaign Generator
- **Smart Copywriting Microservice**: Powered by Python FastAPI & Groq LLM (`openai/gpt-oss-120b`) to generate high-converting campaign titles, taglines, and detailed descriptions.
- **Customizable Tone & Length**: Tailors campaign messaging across multiple tones (*Inspiring, Professional, Casual, Urgency-driven, Storytelling*) and length configurations.

### 💳 2. Financial Ecosystem & Razorpay Integration
- **Dual Payment Channels**: Supports both authenticated internal wallet transactions and guest/user donations via Razorpay gateway.
- **Digital Wallet Engine**: Instant wallet funding, ledger tracking (`ADD_FUNDS`, `DONATION`, `WITHDRAWAL`), and 1-click contributions.
- **Creator Payouts**: "Keep-what-you-raise" model enabling campaign creators to withdraw raised funds directly to their digital wallet.
- **Cryptographic Payment Verification**: Server-side Razorpay HMAC SHA256 signature verification ensuring secure transactions.

### 🏆 3. Gamification & Leaderboard Engine
- **Automated Milestone Badges**: Real-time evaluation engine awarding badges (*First Donation*, *Contributor*, *Supporter*, *Campaigner*, *Fundraiser*).
- **Celebratory UX**: Interactive badge unlock modals with confetti (`react-confetti`) and micro-animations (`framer-motion`).
- **Global Leaderboard**: Live rankings tracking top backers and top fundraising campaign creators.

### 🎯 4. Campaign Management Wizard
- **Multi-Step Wizard**: Stepper form with client/server validation and optimistic UI updates.
- **Categorization & Media Uploads**: Categorize projects (*Startup, Hackathon, Project, Social Cause, Creative*) with Cloudinary-backed image storage.
- **Progress Tracking**: Real-time funding progress bars, backer counts, and deadline countdowns.

### 🔒 5. Enterprise Security & Auth
- **JWT & HTTP-Only Cookies**: Secure session token persistence protecting against XSS attacks.
- **Google OAuth 2.0**: Single sign-on (SSO) integration alongside email verification and password reset flows (Nodemailer / Resend).
- **Production-Grade Headers**: Security headers enforced via `helmet` (Custom CSP for Razorpay & Cloudinary), CORS origin whitelisting, and rate limiting.

---

## 🛠️ Tech Stack

### Frontend (`/Client`)
- **Core Framework**: React 19, Vite, React Router v7
- **Styling & UI**: TailwindCSS v4, DaisyUI, Framer Motion, Lucide React, React Icons
- **State Management**: Zustand
- **Visuals & Feedback**: Recharts (Analytics), React Confetti, React CountUp, React Toastify

### Backend (`/Server`)
- **Runtime & Server**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ORM
- **Auth & Security**: JWT, Passport.js (Google OAuth 2.0), Helmet, Express Rate Limit, Cookie Parser
- **Integrations**: Razorpay SDK, Cloudinary (Multer), Nodemailer / Resend

### AI Service (`/ai-service`)
- **Framework**: Python 3.12+, FastAPI, Uvicorn
- **Data Validation**: Pydantic v2
- **AI Engine**: Groq SDK (`openai/gpt-oss-120b`)

---

## 📁 Repository & Folder Structure

```
CAPSTONE/
├── Client/                      # React 19 Frontend (Vite + TailwindCSS v4)
│   ├── public/                  # Static assets & favicon
│   ├── src/
│   │   ├── assets/              # Images, icons, and illustrations
│   │   ├── components/          # UI Components
│   │   │   ├── about/           # About section components
│   │   │   ├── auth/            # Auth forms & login modals
│   │   │   ├── campaigns/       # Campaign cards, filters, and details
│   │   │   ├── dashboard/       # Creator analytics & stats widgets
│   │   │   ├── footer/          # App footer component
│   │   │   ├── home/            # Hero banner, features, showcase
│   │   │   ├── modals/          # Badge unlock & donation success modals
│   │   │   ├── navbar/          # Header navigation & user profile dropdown
│   │   │   ├── steps/           # Multi-step campaign creation wizard
│   │   │   └── ui/              # Shared buttons, loaders, input fields
│   │   ├── pages/               # Application Page Views
│   │   │   ├── auth/            # Login, Register, Email Verify, Password Reset
│   │   │   └── ui/              # Home, CampaignList, Dashboard, Leaderboard, About
│   │   ├── store/               # Zustand Global Stores
│   │   │   ├── authStore.jsx        # User state & authentication
│   │   │   ├── campaignStore.jsx    # Campaigns data & creation state
│   │   │   ├── leaderboardStore.jsx # Leaderboard rankings
│   │   │   └── walletStore.jsx      # Digital wallet balance & transactions
│   │   ├── utils/               # Axios API client & helpers
│   │   ├── App.jsx              # Main App routing configuration
│   │   ├── index.css            # Global CSS styles & Tailwind directives
│   │   └── main.jsx             # React DOM root entry
│   ├── eslint.config.js         # ESLint configuration
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite build configuration
│
├── Server/                      # Node.js + Express REST API Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection & Passport Google strategy
│   │   ├── controllers/         # API Route Controllers
│   │   │   ├── aiController.js         # AI proxy controller
│   │   │   ├── authController.js       # Auth, registration, OTP, Google OAuth
│   │   │   ├── campaignController.js   # Campaign CRUD & donation processing
│   │   │   ├── leaderboardController.js# Leaderboard aggregation queries
│   │   │   ├── paymentController.js    # Razorpay order generation & verify
│   │   │   └── walletController.js     # Wallet balance & withdrawal operations
│   │   ├── mail/                # Email templates & sender service
│   │   ├── middleware/          # Auth JWT protection & error handler
│   │   ├── models/              # Mongoose Schemas (User, Campaign, Payment, WalletTransaction)
│   │   ├── routes/              # Express API Route endpoints
│   │   ├── seeds/               # Database seeding utilities
│   │   ├── utils/               # Cloudinary uploader & Nodemailer wrapper
│   │   └── index.js             # Express app entry & middleware stack
│   ├── package.json             # Backend dependencies & scripts
│   └── .env                     # Server environment configuration
│
├── ai-service/                  # Python FastAPI AI Microservice
│   ├── app/
│   │   ├── main.py              # FastAPI app initialization & CORS rules
│   │   ├── routes.py            # AI endpoints (/generate)
│   │   ├── schemas.py           # Pydantic data validation models
│   │   └── llm.py               # Groq LLM integration & prompt engineering
│   ├── pyproject.toml           # Python package metadata
│   ├── requirements.txt         # Dependencies list
│   └── .env                     # AI service configuration
│
├── LICENSE                      # License details
└── README.md                    # Project documentation
```

---

## ⚡ Quick Start & Setup Guide

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Python**: `3.10+`
- **MongoDB**: Local MongoDB or MongoDB Atlas Cluster URI
- **API Keys**: Cloudinary, Razorpay (Test mode), Groq API Key

---

### 1. Clone the Repository
```bash
git clone https://github.com/shivanshanand/FuelFundr.git
cd FuelFundr
```

---

### 2. Configure Environment Variables

#### Backend (`/Server/.env`)
Create `.env` inside the `Server/` directory:
```env
PORT=2727
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REFRESH_SECRET=your_refresh_secret_key
FRONTEND_URL=http://localhost:5173

# Razorpay Integration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Services
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
RESEND_API_KEY=your_resend_api_key

# Google OAuth 2.0 (Note: callbackURL now uses SERVER_URL env variable instead of hardcoded localhost)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Service Link
GROQ_API_KEY=your_groq_api_key

# Deployment & Routing
SERVER_URL=http://your-ec2-public-ip:2727
AI_SERVICE_URL=http://localhost:8000
```

#### Frontend (`/Client/.env`)
Create `.env` inside the `Client/` directory:
```env
VITE_API_URL=http://localhost:2727/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### AI Service (`/ai-service/.env`)
Create `.env` inside the `ai-service/` directory:
```env
AI_SERVICE_URL=http://localhost:8000
GROQ_API_KEY=your_groq_api_key
```

---

### 3. Start the Microservices

#### Step A: Launch the AI Service (Python FastAPI)
```bash
cd ai-service
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Uvicorn development server
uvicorn app.main:app --reload --port 8000
```

#### Step B: Launch the Node.js Backend Server
```bash
cd Server
npm install
npm run start
```
*Server runs at `http://localhost:2727`*

#### Step C: Launch the React Client
```bash
cd Client
npm install
npm run dev
```
*Client runs at `http://localhost:5173`*

#### Step D: Run with PM2 (Production)
```bash
pm2 start "node src/index.js" --name fuelfundr-server
pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 8000" --name fuelfundr-ai
pm2 save
```

---

## ☁️ AWS Deployment

- **EC2 instance (Ubuntu)** hosting the Node.js backend + Python AI microservice
- **PM2 process manager** running `fuelfundr-server` and `fuelfundr-ai`
- **Backend running on port 2727**, **AI service on port 8000**
- **Environment variable `SERVER_URL`** added to `Server/.env` for dynamic callback URLs

---

## 📡 API Overview

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/auth/register` | Register new user account | ❌ |
| **POST** | `/api/auth/login` | Authenticate user & issue HTTP-only cookie | ❌ |
| **GET** | `/api/auth/google` | Trigger Google OAuth 2.0 flow | ❌ |
| **GET** | `/api/campaigns` | Fetch active/fulfilled campaigns | ❌ |
| **POST** | `/api/campaigns` | Create a new campaign (Wizard) | 🔒 |
| **POST** | `/api/campaigns/:id/donate` | Donate via internal wallet balance | 🔒 |
| **POST** | `/api/payment/create-order` | Create Razorpay order | 🔒 / Guest |
| **POST** | `/api/payment/verify` | Verify Razorpay payment signature | 🔒 / Guest |
| **GET** | `/api/wallet/balance` | Fetch user wallet balance & transaction ledger | 🔒 |
| **POST** | `/api/wallet/withdraw` | Withdraw campaign earnings | 🔒 |
| **GET** | `/api/leaderboard` | Top donors & campaign creators | ❌ |
| **POST** | `/api/ai/generate` | AI generation for campaign content | 🔒 |

---

## 🛡️ Production & Security Best Practices

- **Strict CSP Policy**: Enforced via Helmet with whitelisted Razorpay & Cloudinary frame/script sources.
- **Schema Validation**: Strong typing and validation using Mongoose (Node.js) and Pydantic v2 (Python).
- **HMAC Signature Verification**: Server-side Razorpay payment signature verification protecting against tampering.
- **HTTP-Only Token Storage**: Mitigating XSS attack vectors for session JWT management.

---

## 👨‍💻 Author

Crafted with ❤️ by **Shivansh Anand**
- Full-Stack Developer passionate about building fast, scalable web apps with modern design & AI integration.
- GitHub: [@shivanshanand](https://github.com/shivanshanand)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
