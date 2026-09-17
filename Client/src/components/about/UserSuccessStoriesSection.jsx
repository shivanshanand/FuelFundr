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
    stars: 5,
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
    stars: 5,
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
  <section id="success-stories" className="py-16 bg-slate-50 dark:bg-slate-950/20 select-none">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-center gap-2 mb-10">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          User Success Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {successStories.map((u, i) => (
          <div
            key={i}
            className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={u.imgSrc}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10 shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {u.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                      <School className="w-3 h-3 text-indigo-500" />
                      <span>{u.university}</span>
                    </span>
                  </div>
                </div>

                <div className="flex">
                  {[...Array(u.stars)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
              </div>

              <h5 className="text-sm font-bold text-indigo-500 mb-1">
                {u.title}
              </h5>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {u.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UserSuccessStoriesSection;
