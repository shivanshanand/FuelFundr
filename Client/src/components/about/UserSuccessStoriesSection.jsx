import { Sparkles, School, Star } from "lucide-react";

const successStories = [
  {
    name: "Priya S.",
    university: "IIT Bombay",
    title: "Raised funds for women-in-tech project",
    story:
      "Priya launched her mentorship initiative with FuelFundr and raised ₹35,000 in just 8 days, connecting over 120 mentors and mentees. Her project is now a university-wide club.",
    imgSrc: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
  },
  {
    name: "Rahul M.",
    university: "BITS Goa",
    title: "Built India's first student solar scooter",
    story:
      "Rahul’s campaign crossed the target in record time! His team built an eco-scooter showcased at the BITS Tech Expo, getting national media coverage.",
    imgSrc: "https://randomuser.me/api/portraits/men/41.jpg",
    stars: 5,
  },
  {
    name: "Ankita N.",
    university: "SRM University",
    title: "NGO gained 400+ backers for social drive",
    story:
      "Ankita’s Youth4Change campaign on FuelFundr provided meals for 600 children. Donation tracking, secure payouts, and badges turned backers into repeat supporters!",
    imgSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 4,
  },
  {
    name: "Soham B.",
    university: "IISc Bangalore",
    title: "RoboCar team reached global competitions",
    story:
      "FuelFundr was the launchpad that took our robotics team to Singapore—with 140+ unique donors and full transparency, all in one dashboard.",
    imgSrc: "https://randomuser.me/api/portraits/men/17.jpg",
    stars: 5,
  },
  {
    name: "Sanya J.",
    university: "NIT Trichy",
    title: "Crowdfunded hackathon for women coders",
    story:
      "Sanya ran India’s first all-women collegiate hackathon, raising funds solely via FuelFundr. The badges and Leaderboard got alumni excited to give!",
    imgSrc: "https://randomuser.me/api/portraits/women/82.jpg",
    stars: 4,
  },
  {
    name: "Shubham G.",
    university: "NIT Jalandhar",
    title: "Developed a Mental Health Chatbot",
    story:
      "With FuelFundr, our team brought a mental health chatbot to life, reaching over 400 students in the first month. Getting support was fast and transparent, and sharing our journey with donors was incredibly rewarding.",
    imgSrc: "https://randomuser.me/api/portraits/men/27.jpg",
    stars: 5,
  },
];

const UserSuccessStoriesSection = () => (
  <section
    id="success-stories"
    className="py-16 bg-gradient-to-b from-slate-900/90 to-blue-900/90 via-slate-950 relative"
  >
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent flex items-center justify-center gap-3 text-center">
        <Sparkles className="w-9 h-9 text-yellow-300 -mt-2" /> User Success
        Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-9">
        {successStories.map((u, i) => (
          <div
            key={i}
            className="bg-white/95 dark:bg-slate-900/85 border border-blue-100 dark:border-slate-800 rounded-2xl shadow-xl p-5 sm:p-7 flex flex-col gap-3 md:flex-row items-center sm:items-start"
          >
            <img
              src={u.imgSrc}
              alt={u.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-blue-300 shadow-md mb-2 md:mb-0"
              loading="lazy"
            />
            <div className="flex-1 md:ml-5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="font-bold text-blue-800 dark:text-green-200 text-base sm:text-lg">
                  {u.name}
                </span>
                <School className="w-4 h-4 text-green-400" />
                <span className="text-sm text-blue-600 dark:text-blue-300 font-semibold">
                  {u.university}
                </span>
                <span className="flex ml-2">
                  {[...Array(u.stars)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-400 fill-yellow-300"
                    />
                  ))}
                </span>
              </div>
              <div className="text-[1.06rem] font-semibold text-blue-900 dark:text-green-200 mb-0.5 leading-tight">
                {u.title}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-base leading-snug">
                {u.story}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UserSuccessStoriesSection;
