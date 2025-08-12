import mongoose from "mongoose";
import dotenv from "dotenv";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";

dotenv.config();

function getRandomUser(usersArr) {
  return usersArr[Math.floor(Math.random() * usersArr.length)];
}

function getRandomStatus() {
  const choices = ["open", "fulfilled", "closed"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickNDistinctUsers(usersArr, n, excludeUserId) {
  const filtered = excludeUserId
    ? usersArr.filter((u) => u._id.toString() !== excludeUserId.toString())
    : [...usersArr];
  const picked = [];
  while (picked.length < n && filtered.length) {
    const idx = Math.floor(Math.random() * filtered.length);
    picked.push(filtered[idx]);
    filtered.splice(idx, 1);
  }
  return picked;
}

async function seedCampaigns() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const usersList = await User.find({});

    await Campaign.deleteMany({});
    await WalletTransaction.deleteMany({});

    const campaignTemplates = [
      {
        title: "Girls Hostel Renovation",
        description: `
Welcome to the Girls' Hostel Renovation Campaign

A safe and supportive home is the foundation for academic success and personal growth. But for over 200 ambitious young women living in our aged campus girls’ hostel, daily life means coping with unreliable facilities, outdated security, and cramped common areas. With your support, we aim to transform their living space into a modern haven that inspires excellence and wellbeing.

Who are we helping?
- Residents include students from disadvantaged backgrounds, many first-generation college-goers from rural Punjab and neighboring states.
- The current hostel building, constructed over 25 years ago, lacks basic comforts and facilities.
- For these young women, the hostel is more than a residence—it is their community, sanctuary, and stepping stone toward their dreams.

Key Features of the Renovation Project:
1. **Modern common rooms:** New ergonomic seating, bright study nooks, WiFi upgrades, and group workspaces.
2. **Revamped sanitation:** RO water lines, modular restrooms, fresh tilework, and 24/7 hot shower access.
3. **Improved safety:** CCTV installation, lit corridors, secure entry gates, female security guards, and campus safety app for parents.
4. **Eco-makeover:** LED lighting, robust waste management, and rooftop greenery for a healthier indoor climate.
5. **Personal touches:** Inspirational wall art by local women artists, and lounge spaces for community-building.

How the funds will be used:
- 45%: Building repairs, new plumbing, painting, flooring, and roofing.
- 25%: Security equipment, access controls, lighting.
- 20%: Sanitation upgrades and eco-amenities.
- 10%: Furnishing, mattresses, books, and outreach activities.

When the project is completed within 6 months, our girls will experience vastly improved well-being—and their families will rest easier knowing their daughters are safe, happy, and set up for success.

Your Impact and Why Now:
You help create a legacy for generations of women scholars. Donors and alumni will have their names engraved in the hostel lounge as lifelong supporters. Every contribution—large or small—goes directly toward creating a better tomorrow, today.

Join us on this mission! Your generosity builds futures.
`,
        targetAmount: getRandomAmount(100000, 200000),
        image:
          "https://images.unsplash.com/photo-1652939331840-d2db4726c859?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHMlMjBIb3N0ZWwlMjBSZW5vdmF0aW9ufGVufDB8fDB8fHww",
        category: "Social Cause",
      },

      {
        title: "Code for Kids - Chandigarh",
        description: `
Lighting the Spark: Code for Kids – Chandigarh

India’s digital revolution must include every child. In the by-lanes of Chandigarh, thousands of underprivileged kids are left behind due to a lack of access to computers and coding education. This campaign brings the world of programming, robotics, and digital creativity right to their doorstep.

Who benefits?
- Children from urban slums and impoverished neighborhoods, ages 8-15.
- Volunteers are trained university students passionate about education and equality.

What makes this different?
- Five weekly coding bootcamps set up in local government schools and community centers.
- Children learn Scratch, basic Python, robotics kits, and digital citizenship.
- Career guidance and mentoring for students who show special talent or drive.

How your contribution is used:
• 45%: Laptops, Raspberry Pi kits, and classroom AV equipment.
• 25%: Travel, insurance, and stipends for volunteer teachers.
• 20%: Internet access, food/snacks during classes.
• 10%: Printed training materials, prizes, and program management.

Anticipated Impact:
Participants gain critical skills for higher studies or future employment. Talented students will join city-level code-a-thons and make friends for life. Donors will receive program updates and student thank-you notes.

Support this campaign and help us unlock the first chapter of the digital future for every child!
`,
        targetAmount: getRandomAmount(50000, 120000),
        image:
          "https://images.pexels.com/photos/10638075/pexels-photo-10638075.jpeg",
        category: "Project",
      },

      {
        title: "Startup Demo Day",
        description: `
Startup Demo Day: Fueling Tomorrow’s Innovators

Every great business story starts with an idea—and a platform to shine. Startup Demo Day brings together student entrepreneurs, expert mentors, and investors for an electrifying showcase. By funding this event, you support dreams turning into reality right here on campus.

Who benefits most?
- 20+ shortlisted student startup teams from engineering, business, and science backgrounds.
- Judges’ panel of alumni, angel investors, and senior faculty.
- Campus community eager for new ideas and inspiration.

Key features and Highlights:
- Main event: Teams pitch live on stage, with 5 minutes to wow the jury and the crowd.
- Workshops: Funded pre-event bootcamps on pitching, business models, and prototyping.
- Top awards: Cash grants, mentoring, incubation office access, and legal support for the most promising startups.

How your support is used:
- 55% for event logistics, audio-visual setup, and streaming infrastructure.
- 30% for prizes, grants, and post-event workshops.
- 15% for branding, meals, and program outreach.

Last year’s event sparked two student startups that are now making real impact in the market!  
With your contribution, more students will chase, and achieve, their biggest ambitions.

Let’s turn sparks into stars—support Startup Demo Day!
`,
        targetAmount: getRandomAmount(90000, 180000),
        image:
          "https://images.pexels.com/photos/8518633/pexels-photo-8518633.jpeg",
        category: "Startup",
      },

      {
        title: "National Hackathon 2025",
        description: `
National Hackathon 2025: The Race Toward India's Tech Future

Hackathons are the crucible of innovation where next-generation tech wizards are forged.  
National Hackathon 2025 draws over 500 students from across India for a 36-hour, adrenaline-fueled coding and building challenge.

Who participates?
- Undergraduates and postgraduates in CS/IT/engineering from 100+ colleges.
- Special outreach to women coders and rural teams.

Notable Event Features:
- Problem tracks: Sustainability, FinTech, Healthcare, Education, AI/ML.
- 24x7 mentor access, real-time leaderboards, and corporate workshops.
- Nightlong food truck fest and entertainment so minds and bodies stay fresh.

Expense Plan:
- 40% for venue, cloud computing credits, and AV setup.
- 30% for travel, stay, and meals for finalists.
- 20% for prize money/internship offers.
- 10% for branding, SWAG kits, and live telecast.

Expected Outcomes and Impact:
Winning prototypes receive incubation at national partner accelerators.  
Donors get exclusive reports, video highlights, and shout-outs during the opening ceremony.

Code. Create. Compete. Contribute!  
Back National Hackathon 2025 and shape the tech leaders of tomorrow!
`,
        targetAmount: getRandomAmount(150000, 300000),
        image:
          "https://technotimes.info/wp-content/uploads/2025/05/Winner-Team-Pics2-1600x1200.jpg",
        category: "Hackathon",
      },

      {
        title: "Campus Eco Initiative",
        description: `
Campus Eco Initiative – Greening Our Future, Together

It’s time to leave a greener legacy! The Campus Eco Initiative is a student-led project to make sustainability a daily practice for everyone on campus.  
By giving, you empower the next generation to combat climate change starting with their own community.

Who benefits?
- 6500+ students and staff who share our campus.
- Local schools and city residents learning from our model.

What We’ll Do:
- Install 60+ three-bin recycling stations at key locations.
- Organize monthly tree plantation drives and composting workshops.
- Launch “Green Fest” to engage new students in eco-actions.

Funding Allocation:
- 35% to buy bins, trees, and organic compost.
- 35% for educational material, event setup, guest speakers.
- 20% for garden/green corner installations and maintenance.
- 10% for social media campaigns and student club incentives.

Goals and Milestones:
Within 8 months, we plan to reduce non-recyclable campus waste by 35% and plant 2000 new trees.
Donors will be recognized on our “Green Warriors” honor roll and get regular project updates.

If you believe in a cleaner, brighter tomorrow, join us today!
`,
        targetAmount: getRandomAmount(60000, 120000),
        image:
          "https://plus.unsplash.com/premium_photo-1679607581922-ba5c2558669b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2FtcHVzJTIwRWNvJTIwSW5pdGlhdGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Social Cause",
      },

      {
        title: "College Short Film Festival",
        description: `
College Short Film Festival: Every Voice, Every Frame

Every year dozens of creative students use short films to spark conversation.  
The College Short Film Festival celebrates their vision, bringing powerful stories—and those who tell them—into the spotlight.

The Community Impact:
- Student filmmakers from diverse backgrounds, including many from smaller towns or first-time directors.
- All films screen publicly, free to campus and the city.

Festival Highlights:
- Three days of short films, documentaries, and workshops.
- Awards for Best Story, Best Technical, and People's Choice (voted by you!).
- Guest filmmaker masterclasses and critique sessions.

Fund Usage:
- 50% for rental of digital projectors, screens, and sound systems.
- 30% for awards, jury expenses, and filmmaker travel support.
- 20% for festival outreach, logistics, and meal stipends.

Supporters will be credited on our festival website, and top donors receive exclusive invites to special events.

Celebrate new voices and amplify talent—be part of the festival that champions tomorrow’s directors!
`,
        targetAmount: getRandomAmount(40000, 100000),
        image:
          "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENvbGxlZ2UlMjBGaWxtJTIwRmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
        category: "Creative",
      },

      {
        title: "Mobile Library for Rural Schools",
        description: `
Mobile Library for Rural Schools: Ignite Young Minds

In the rural schools surrounding Hoshiarpur, the joy of books is a rare privilege. Our Mobile Library project is committed to delivering hope, knowledge, and imagination directly to these children.

About the Recipients:
- Over 2,000 students from 12 remote villages, with limited access to libraries or internet.
- Teachers eager to inspire their students beyond standard textbooks.

Project Highlights:
- Outfitting a minivan with 2,000+ books in English, Hindi, and Punjabi.
- Rotating science kits, illustrated comics, and learning games.
- Weekly visits with reading sessions, competitions, and take-home book exchange.

Funding Plan:
- 50% for vehicle leasing, branding, and maintenance.
- 25% for book and kit acquisition.
- 15% for fuel, driver, and librarian salary.
- 10% for outreach and village engagement activities.

Why It Matters:
Book access is proven to increase literacy, school retention, and dreams. Our donors empower an entire generation and will be honored on plaques inside the mobile library.

Help us fuel minds and futures, one village at a time!
`,
        targetAmount: getRandomAmount(90000, 150000),
        image:
          "https://images.unsplash.com/photo-1507010228826-fd02d8c83ddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1vYmlsZSUyMExpYnJhcnklMjBmb3IlMjBSdXJhbCUyMFNjaG9vbHN8ZW58MHx8MHx8fDA%3D",
        category: "Project",
      },

      {
        title: "Student Innovators Exchange",
        description: `
Student Innovators Exchange: Elevating Young Entrepreneurs

Every invention needs a stage. The Student Innovators Exchange program provides bright students their first shot to present and learn at national innovation bootcamps.

Who is this for?
- 50+ selected university innovators, with a focus on engineering, biotech, and sustainability.
- Our regional partners in the startup ecosystem.

What’s included:
- Full travel, lodging, and participation support for national bootcamps and competitions.
- Pre-departure orientation: soft skills, pitching basics, and networking strategies.
- Alumni mentoring to level up learning for all participants.

Fund Breakdown:
- 60% for travel, stays, and registration fees.
- 25% for onboarding orientations, mentorship.
- 15% for portfolio building and reporting.

Your Return:
Donors receive quarterly reports on student progress, invites to demo days, and special recognition in program highlights.

Let’s connect talent to opportunity—support the Exchange!
`,
        targetAmount: getRandomAmount(75000, 160000),
        image:
          "https://media.istockphoto.com/id/1461631485/photo/group-of-young-students-checking-exam-results-or-waiting-for-project-approval-on-laptop-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=z8ZCUB5J5YJM98mOnXZr3F68On-eiq5_Za7uxXOeg60=",
        category: "Startup",
      },

      {
        title: "Blood Donation Mega Camp",
        description: `
Blood Donation Mega Camp – Courage in Every Unit

Every day, thousands need blood transfusions – but India faces a chronic shortage of safe blood donors. The Mega Camp is our response, rallying an entire campus—and you—to give the gift of life.

Who joins us?
- Student, staff, and local residents – over 2,000 potential donors.
- Partner hospitals, NGOs, and Red Cross teams ensuring screening and safety.

Unique Features:
- Secure, comfortable donation zones with snacks, aftercare, and student nurses.
- Awareness drives on plasma, bone marrow, organ donations.
- Donor appreciation wall and digital achievement badges.

How We Utilize Your Support:
- 55% for logistics, beds, kits, and ambulance standby.
- 25% for medical staff and donor amenities.
- 15% for outreach and publicity.
- 5% for innovative aftercare and mobile data entry systems.

Changing Lives:
Last year’s camp saved over 500 lives! Help us triple the impact this year.  
Top donors will receive certificates and event access passes.

Be a lifeline. Donate with us!
`,
        targetAmount: getRandomAmount(50000, 130000),
        image:
          "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
        category: "Social Cause",
      },

      {
        title: "Tech Talks Guest Lecture Series",
        description: `
Tech Talks Guest Lecture Series: Wisdom from the Frontlines

We dream of a campus where every student gets to learn from the world’s best minds. The Tech Talks Series makes this a reality by inviting 10+ world-class founders, engineers, and visionaries for open Q&As and expert masterclasses.

Who participates:
- All students, regardless of branch or year.
- Local entrepreneurs seeking mentorship and open networking.

Series Highlights:
- Monthly lectures, with fireside chats and real-world startup stories.
- Hands-on deep dives in AI, web3, IoT, startup marketing, and more.
- Resume bootcamps and portfolio clinics with industry mentors.

How we spend funds:
- 60% on AV and event setup, guest logistics, and speaker honorariums.
- 25% on student-led workshops and certification.
- 15% on branding, meals, and Q&A pamphlets.

Donor Perks:
Top supporters get exclusive access to private networking, post-event dinners, and “Tech Talks Hall of Fame” listing.

Bring inspiration home—help share knowledge that changes lives!
`,
        targetAmount: getRandomAmount(80000, 160000),
        image:
          "https://images.pexels.com/photos/30561676/pexels-photo-30561676.jpeg",
        category: "Project",
      },

      {
        title: "Solar Power for Classrooms",
        description: `
Solar Power for Classrooms: Brightening the Future Sustainably

Power cuts disrupt learning and challenge our quest for a modern campus. This campaign brings eco-friendly solar energy solutions to five academic buildings—so students can learn without interruption.

Who Will Benefit?
- 2000+ enrolled students, dozens of teaching classrooms, labs, and seminar halls.
- The broader Hoshiarpur community, who can tour and learn about renewable tech.

Project Implementation:
- Install 150 rooftop solar panels, with battery-backed units for seamless power.
- Energy dashboards track savings and spark green awareness.
- Partner with solar advocacy NGOs for maintenance and student internships.

Funding Use:
- 75% for panel purchase, engineering, and installation.
- 15% for dashboard technology and ongoing maintenance.
- 10% for awareness campaigns and guest lectures.

Our Promise:
Within six months, we’ll cut our grid energy use by 40%, save lakhs in bills, and run fully carbon-neutral classrooms. Donors will be invited to an inaugural demo and receive “Green Champion” badges upon project completion.

Support the shift to clean energy—your donation multiplies impact for years to come!
`,
        targetAmount: getRandomAmount(120000, 250000),
        image:
          "https://plus.unsplash.com/premium_photo-1679607686280-53c9473f5a80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29sYXIlMjBQb3dlciUyMGZvciUyMENsYXNzcm9vbXN8ZW58MHx8MHx8fDA%3D",
        category: "Social Cause",
      },

      {
        title: "Open Air Theatre Renaissance",
        description: `
Reviving the Heartbeat of Campus – The Open Air Theatre Renaissance

Our once-vibrant Open Air Theatre (OAT) was the center stage for music nights, cultural festivals, and lively debates. Now it stands weathered, longing for fresh performances and laughter. Help us breathe new life into this cherished venue.

Who Benefits:
- All 6,000+ students and staff who attend and perform.
- Annual visitors during inter-college cultural fests.

Project Features:
- Complete rewiring, high-efficiency floodlights, and smart stage sound.
- New tiered seating for 500+ for year-round comfort.
- Wheelchair accessibility and safe ramps for talent and attendees.
- Exclusive student mural walls and digital schedule displays.

Funding Breakdown:
- 60% for construction and lighting improvements.
- 25% for seating and sound system.
- 15% for murals, digital screens, and accessibility work.

Impact:
Events return bigger than ever! Every donor family is credited on the dedication wall.  
Support the arts, power the future—help us light up the OAT once more!
`,
        targetAmount: getRandomAmount(90000, 180000),
        image:
          "https://images.unsplash.com/photo-1547997406-e915ef666ac7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3BlbiUyMEFpciUyMFRoZWF0cmUlMjBSZW5haXNzYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Creative",
      },

      {
        title: "Medical Aid for Students in Need",
        description: `
Building Hope: Emergency Medical Fund for Students

No one should have to delay urgent care due to cost. Our medical aid campaign forms a lifeline for students and their families in times of crisis—surgery, accident recovery, or sudden illness.

Who it helps:
- Needy students with critical medical bills not covered by insurance or government schemes.
- Peer and mental health support for extended recovery, including therapy and ongoing medications.

How Will This Fund Be Used?
- Immediate disbursement for surgery/hospitalization expenses.
- Scheduled grants for chronic care and rehabilitation.
- First-responder kits distributed to campus hostels.

Spending Plan:
- 70% for direct medical bill grants.
- 20% for medication and emergency therapy.
- 10% for health education, volunteer training, and first aid workshops.

Last year, our emergency fund saved four student lives—help us extend it to everyone who needs it.  
Create a safety net on campus—be the reason someone’s child thrives, not just survives.
`,
        targetAmount: getRandomAmount(100000, 220000),
        image:
          "https://plus.unsplash.com/premium_photo-1681248156494-b72275ff6b51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE1lZGljYWwlMjBBaWQlMjBmb3IlMjBTdHVkZW50cyUyMGluJTIwTmVlZHxlbnwwfHwwfHx8MA%3D%3D",
        category: "Social Cause",
      },

      {
        title: "Annual Robotics Expo",
        description: `
Annual Robotics Expo – Showcasing Young Engineers’ Dreams

Innovation takes center stage at our annual expo, where students design, prototype, and demonstrate robots with real-world use.

Attendees & Impact:
- Over 300 BTech and MTech robotics, electronics, and CS students.
- School groups and community kids see the future in action.

What’s Funded:
- High-tech parts: sensors, controllers, wheels, metalwork.
- Masterclass visits from ISRO alumni and local industry.
- Expo booths and interactive “try a bot” zones.

Financials:
- 60% components and equipment.
- 30% guest expert fees, trophies, and booth builds.
- 10% for youth STEM workshops and event literature.

Your contribution fuels the spark of ingenuity, and may even help launch the next Indian robotics startup!
Donors are invited to judge the People’s Choice bot.
`,
        targetAmount: getRandomAmount(70000, 150000),
        image:
          "https://images.unsplash.com/photo-1654009603731-20b6d7536002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJvYm90aWN8ZW58MHx8MHx8fDA%3D",
        category: "Project",
      },

      {
        title: "Women in Tech Scholarship Fund",
        description: `
Women in Tech Scholarship – Closing the Gender Gap in STEM

Let’s empower more women to excel in computer science and engineering!  
Too often, talented women pause or drop out for financial reasons—this fund ensures no dream is sacrificed.

Who’s Helped:
- 20+ high-achieving, low-income women in BTech/BE/CS/MCA programs.

Key Features:
- Annual tuition and laptop scholarships.
- Leadership workshops and alumni mentorship.
- Empowerment weekends and pitch events to foster belonging.

Funding Plan:
- 60% direct scholarships.
- 25% for laptops and software.
- 15% for events and mentorship stipends.

The Impact:
Last year’s recipients became campus coding club officers and national hackathon winners.  
Bee part of their journeys—donate today and your name is inscribed as a founding supporter.
`,
        targetAmount: getRandomAmount(80000, 180000),
        image:
          "https://images.unsplash.com/photo-1573165067541-4cd6d9837902?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V29tZW4lMjBpbiUyMFRlY2h8ZW58MHx8MHx8fDA%3D",
        category: "Social Cause",
      },

      {
        title: "Hostel Reading Room Makeover",
        description: `
Reimagine the Reading Room: Every Hostel Deserves a Sanctuary

For hundreds of resident students, the reading room is a retreat—a place for peace, focus, and recharging with a good book. Our campaign brings this essential space back to life.

Who Will Benefit:
- Students from all years, prepping for exams or destressing with fiction.
- Night owls—reading room now stays open till midnight!

What We’ll Change:
- Smart LED lighting for energy and eye comfort.
- Ergonomic chairs, new desks, beanbags, and lounge rugs.
- Magazine rack, daily newspapers, and graphic novels shelf.
- Art walls contributed by hostellers.

Funding Distribution:
- 60% on refurnishing and lights.
- 30% for new reading material.
- 10% for wall art supplies and launch party.

Donors will have favorite book quotes as part of the mural.
Refresh minds, not just rooms—join the campaign!
`,
        targetAmount: getRandomAmount(40000, 80000),
        image:
          "https://images.unsplash.com/photo-1551133990-60f24c1e4158?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SG9zdGVsJTIwUmVhZGluZyUyMFJvb20lMjBNYWtlb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
        category: "Project",
      },

      {
        title: "Student Art Installation",
        description: `
Art for All: A Landmark Student Installation

Our campus deserves to inspire creativity every day! This campaign supports the first large-scale, student-designed art installation.

Who’s Involved:
- Art club members and students from all disciplines.
- Local artisans guide design and workshops.

Features:
- Public sculpture blending recycled materials and digital effects.
- Community painting weekends open to all.
- Lighting and seating to make the space welcoming at night.

Budget:
- 40% for materials and art tools.
- 25% for maker workshops and guest artist honorariums.
- 25% for site prep/security, 10% outreach and launch event.

All donors’ names will inspire as part of the art piece itself!
Unleash creativity—donate today!
`,
        targetAmount: getRandomAmount(60000, 120000),
        image:
          "https://plus.unsplash.com/premium_photo-1701008388346-a0e804226ea8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3R1ZGVudCUyMEFydCUyMEluc3RhbGxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
        category: "Creative",
      },

      {
        title: "Disaster Relief Collection Drive",
        description: `
Standing with Hope: Campus Disaster Relief Drive

When disaster hits, students mobilize resources and compassion faster than anyone.  
Our drive collects and distributes essentials to affected communities—be it floods, earthquakes, or fires.

Who Needs Help:
- Families in rural villages struck by annual flooding and storms.
- Children and the elderly who often receive the least aid.

What’s Collected and Bought:
- Non-perishable food, medicines, blankets, and hygiene kits.
- Ready-to-eat snacks for first responders.
- Tarps, flashlight kits, and clean water bottles.

Allocation:
- 60% for relief kits and logistics.
- 25% for transport and delivery vans.
- 15% for rapid response team training.

Your contribution means help reaches within 36 hours.
Donate today, so we are always ready!
`,
        targetAmount: getRandomAmount(70000, 150000),
        image:
          "https://images.pexels.com/photos/16105750/pexels-photo-16105750.jpeg",
        category: "Social Cause",
      },

      {
        title: "Mentoring First-Gen Students",
        description: `
Powering Dreams: Mentoring First-Generation College Students

First-generation students face unique challenges, from academics to social adjustment.  
Our mentoring program levels the playing field and builds confidence.

Beneficiaries:
- 120+ undergrads whose parents never attended college.

Program Structure:
- Weekly one-on-one sessions with trained upper-year mentors.
- Academic and exam prep workshops.
- Mental health support and exam stress management.

Where the Funds Go:
- 50% mentor training and stipends.
- 30% event and resource packs.
- 20% for well-being counselors.

Join us to create a campus where every ambition gets a fair chance!
`,
        targetAmount: getRandomAmount(50000, 110000),
        image:
          "https://plus.unsplash.com/premium_photo-1663040197283-fae88b360dad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fE1lbnRvcmluZyUyMEZpcnN0JTIwR2VuJTIwU3R1ZGVudHN8ZW58MHx8MHx8fDA%3D",
        category: "Social Cause",
      },

      {
        title: "Cultural Fest Music Concert",
        description: `
Feel the Beat: Cultural Fest Music Concert

The highlight of the year!  
Our stage brings together student bands, guest indie artists, and dance crews for a celebration of sound.

Highlights:
- Open air main stage, pro sound tech, and digital screens.
- Battle of the Bands and campus-wide dance-off.
- All-access for students, family, and local music fans.

Funding Distribution:
- 55% for setup, sound, and lightings.
- 25% performers and hospitality.
- 20% for publicity and festival logistics.

Donors get VIP front row passes!
Safeguard creativity, celebrate culture—fund the best campus concert ever!
`,
        targetAmount: getRandomAmount(80000, 180000),
        image:
          "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
        category: "Creative",
      },

      {
        title: "Bridge the Digital Divide",
        description: `
Bridging the Digital Divide – Tech for All

Not every student can afford a laptop or reliable internet at home. This fund provides devices and connectivity for digital learning, so no student is left behind.

Target Group:
- 150+ low-income or remote students lacking personal tech access.

Action Items:
- Distribute tablets, WiFi dongles, and data plans.
- Training workshops on email, assignments, and e-safety.
- Peer mentoring and on-call tech SOS desk.

Expense Plan:
- 60% for hardware devices.
- 25% data plans and tech support.
- 15% for training and mentoring.

Last year, scores of students completed courses they couldn’t even start before.  
Help bridge the gap—donate a device, change a life!
`,
        targetAmount: getRandomAmount(70000, 160000),
        image:
          "https://images.unsplash.com/photo-1503187685617-d78d295f163e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRpZ2l0YWwlMjBkaXZlfGVufDB8fDB8fHww",
        category: "Social Cause",
      },

      {
        title: "Annual Model United Nations",
        description: `
Debate. Diplomacy. Leadership. Annual Model United Nations

Simulate real world issues, forge young ambassadors.
Our MUN hosts 30+ colleges for a thrilling parliamentary weekend.

Who Benefits:
- All interested undergrads, plus city school invitees.

Features:
- Realistic committees, crisis simulations.
- Opening gala, closing ceremony, and exclusive study kits.

Funds Usage:
- 60% for event setup, kits, and decor.
- 25% for jury, hospitality, and prizes.
- 15% for MUN branding and outreach.

Donors get their names in the Assembly Hall brochure!
Support the next generation of leaders—power our MUN.
`,
        targetAmount: getRandomAmount(45000, 80000),
        image:
          "https://images.unsplash.com/photo-1535483102974-fa1e64d0ca86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEFubnVhbCUyME1vZGVsJTIwVW5pdGVkJTIwTmF0aW9uc3xlbnwwfHwwfHx8MA%3D%3D",
        category: "Project",
      },

      {
        title: "Hackathon for Social Good",
        description: `
Hackers for Humanity: Solving Social Issues Tech-First

What if every hackathon team aimed to save lives, not just build apps?
Our social-good hackathon does just that—empowering students to solve real-world community challenges using technology.

Who Attends:
- 250 technical and non-tech students, open to NGOs for projects.

Track Themes:
- Rural healthcare, education access, women’s safety, and more.

Key Supports:
- API grants, mentorship from impact orgs, and field demo days post-hack.

Spending Plan:
- 50% event logistics and grants for best project continuation.
- 30% for top team training.
- 20% for awareness campaigns and project deployment.

Every donor is recognized on the event webpage and gets a “thank you” infographic to share!
Be part of the solution—fund a hack for good.
`,
        targetAmount: getRandomAmount(120000, 200000),
        image:
          "https://plus.unsplash.com/premium_photo-1677087123074-60abf3faee6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEhhY2thdGhvbiUyMGZvciUyMFNvY2lhbCUyMEdvb2R8ZW58MHx8MHx8fDA%3D",
        category: "Hackathon",
      },

      {
        title: "Alumni Startup Panel",
        description: `
Alumni Startup Panel: Guidance from the Best

There’s nothing more motivating for students than success stories from their own alumni.
This annual panel brings 8+ startup founders back as guest speakers, mentors, and even angels!

Attendees:
- All interested business and tech students, with open Q&A.

Panel Features:
- Keynote speeches, rapid-fire panel, one-on-one “Ask Me Anything” lounges.
- Portfolio review for founders in the making.

Budget Split:
- 40% travel and honoraria.
- 30% session logistics, AV, and refreshments.
- 30% networking dinner.

Supporters receive passes to private dinner events—join the circle that will mentor India’s startup unicorns!
`,
        targetAmount: getRandomAmount(70000, 140000),
        image:
          "https://images.unsplash.com/photo-1600506451234-9e555c0c8d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWx1bW5pJTIwU3RhcnR1cCUyMFBhbmVsfGVufDB8fDB8fHww",
        category: "Startup",
      },

      {
        title: "Leadership Bootcamp",
        description: `
Leadership Bootcamp: Building Future Trailblazers

It takes more than grades to lead change.  
Our bootcamp sharpens leadership, collaboration, and creative thinking through workshops, games, and outdoor challenges.

Open to:
- 60 high-performing students, all disciplines.
- 20 first-year mentees (sponsored by donors).

Features:
- Guided case studies, guest CxO speakers.
- Simulated boardroom negotiations and solution sprints.

Funding Plan:
- 55% expert trainers, guest honorariums.
- 30% leadership toolkits and case packs.
- 15% for residential camp site costs.

Alumni donors will be featured on a special “Inspiration Wall.”
Join us to nurture future leaders!
`,
        targetAmount: getRandomAmount(90000, 180000),
        image:
          "https://images.unsplash.com/photo-1521702335365-b6c01d1198dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhZGVyc2hpcCUyMEJvb3RjYW1wfGVufDB8fDB8fHww",
        category: "Project",
      },

      {
        title: "Open Source for All",
        description: `
Open Source for All – Unlocking Tech for Everyone

Open source isn’t just for coders—it’s for dreamers!  
This campaign launches an open source movement with hackathons, club grants, and workshops for all.

What’s Planned:
- College-wide Git bootcamps, bug bounty leaderboards.
- Hands-on OSS sprints in AI, robotics, climate tech.

Who Benefits:
- BCA, MCA, and other students ready to leap into global tech.
- Local companies sourcing OSS talent.

Where Your Gift Goes:
- 50% platform subscriptions and club grants.
- 35% speaker, mentor, and food expenses.
- 15% hackathon prizes and badges.

Donors are featured in our open source wall of fame and get updates on all successful projects!
Empower more creators—support open source at its roots!
`,
        targetAmount: getRandomAmount(80000, 160000),
        image:
          "https://images.unsplash.com/photo-1634836023845-eddbfe9937da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8T3BlbiUyMFNvdXJjZSUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
        category: "Project",
      },

      {
        title: "Photography Club Equipment",
        description: `
Capturing Moments: The Photography Equipment Fund

Great memories deserve great equipment. Help our student photo club go pro—with SLRs, lighting kits, and editing tools!

Who Gets Help:
- Members of all experience levels benefit.
- Training workshops for beginners, portfolio masterclasses for pros.

Features:
- Equipment library, open to all.
- Annual "Frame It" exhibition to showcase new work.
- Guest artists and Instagrammers hosting sessions.

Expense Breakdown:
- 60% equipment.
- 20% training and masterclasses.
- 20% printing and show costs.

Contributors get front-row seats and a custom photo calendar by club members.
Support campus storytelling—back the club!
`,
        targetAmount: getRandomAmount(60000, 120000),
        image:
          "https://images.unsplash.com/photo-1573553743750-6fc255c393d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGhvdG9ncmFwaHklMjBDbHViJTIwRXF1aXBtZW50fGVufDB8fDB8fHww",
        category: "Creative",
      },

      {
        title: "Inter-College Coding League",
        description: `
Next Level Coding: The Inter-College League

Let’s ignite competitive coding culture. The ICCL is a league-style tournament across campuses, crowning champions offline and online.

Open To:
- All colleges in our region.
- Interdisciplinary teams—diversity encouraged.

Format:
- Weekly code challenges.
- Knockout playoffs and in-person final hack.

Finance Plan:
- 60% platform, servers, data, test set up.
- 25% travel and prizes.
- 15% branding and league gear.

Last year’s winners scored internships at top tech firms!
All backers get exclusive ICCL branding.
Support the code—raise the bar!
`,
        targetAmount: getRandomAmount(100000, 200000),
        image:
          "https://images.pexels.com/photos/4974922/pexels-photo-4974922.jpeg",
        category: "Hackathon",
      },

      {
        title: "Mental Health Awareness Week",
        description: `
Caring Minds: Mental Health Awareness Week

Mental health matters!  
This campaign organizes wellness workshops, yoga, clinical sessions, and resilience talks for students and staff.

Who Benefits:
- All students—especially during stressful exam periods.

Features:
- Certified counsellors, meditation coaches, and peer support drop-in zones.
- 24/7 mental health hotline for emergencies.

Where Your Donation Goes:
- 50% event and expert costs.
- 30% outreach, helpline tech.
- 20% training peer supporters.

Donors receive digital badges and are honored in the “Wall of Care” campaign.
Break the stigma and help every mind thrive!
`,
        targetAmount: getRandomAmount(70000, 150000),
        image:
          "https://plus.unsplash.com/premium_vector-1683141288473-829c57a91555?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVudGFsJTIwaGVhbHRoJTIwYXdhcmVuZXNzfGVufDB8fDB8fHww",
        category: "Social Cause",
      },

      {
        title: "Student Startup Incubation Fund",
        description: `
Ignite Innovation: The Campus Startup Incubation Fund

It all starts with an idea—and a little bit of fuel. Our fund offers microgrants, mentoring, and workspace to new student ventures.

Who We Help:
- 30+ new ventures yearly, from bootstrapped apps to hardware startups.

What’s Covered:
- Incubation space fees, alumni mentor stipend, prototyping.
- Workshops featuring unicorn founders and venture capital mock auditions.

Budget Split:
- 50% grant pool.
- 30% incubation/utility.
- 20% for training and pitching practice.

Donors are invited to the annual “Demo Day.”
Light the spark—invest in the next wave!
`,
        targetAmount: getRandomAmount(120000, 250000),
        image:
          "https://media.istockphoto.com/id/1248774748/vector/startup-investment-concept-venture-capital-financing-financial-support-of-innovative.webp?a=1&b=1&s=612x612&w=0&k=20&c=py_BaJtKtjt-gffzXR1ReAuKyp2n2iy1onm3JjpPLC4=",
        category: "Startup",
      },

      {
        title: "Green Bike Sharing Program",
        description: `
Green Gears: Launching Campus Bike Sharing

Let’s get fit, save the planet, and make our campus commutes fun with a bike sharing system.

Who Gets Involved:
- Entire campus community, powered by a student-run team.
- Local cycling group partners.

Core Project:
- 60 bicycles, GPS tracking, app dashboard.
- “Green Stations” at all main hostels and academic blocks.
- Free rides for events like Earth Day and sports meets.

Funding Details:
- 75% for bikes, tech, and stations.
- 15% maintenance, cycle repair kits.
- 10% promotional events and digital dashboard.

Donors get “first ride” badges and recognition on every Green Station.
Pedal green, pedal together—join us!
`,
        targetAmount: getRandomAmount(80000, 160000),
        image:
          "https://images.unsplash.com/photo-1482325952211-520da0ec9ae0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBiaWtlJTIwc2hhcmluZyUyMHByb2dyYW18ZW58MHx8MHx8fDA%3D",
        category: "Project",
      },

      {
        title: "Women’s Self Defense Workshop",
        description: `
Strong & Safe: Women’s Self-Defense Campaign

Personal safety is every woman’s right.  
Our three-month program teaches students practical, effective defense and situational awareness.

Program Recipients:
- 200+ female students, all years and streams.
- Female faculty and local residents by invitation.

Features:
- Workshops by certified martial arts instructors.
- Crash courses on self-defense gadgets, apps, and campus protocols.
- Empowerment groups and peer-to-peer training for long-term confidence.

Financial Plan:
- 50% trainers, space, practice gear.
- 25% for take-home safety kits.
- 25% empowerment meetups and graduation event.

All donors are thanked in a student-led “wall of honor.”
Support independence, empower courage, fight violence—donate today!
`,
        targetAmount: getRandomAmount(40000, 90000),
        image:
          "https://images.pexels.com/photos/10752027/pexels-photo-10752027.jpeg",
        category: "Social Cause",
      },

      {
        title: "Open Science Day",
        description: `
Curiosity Unleashed: Open Science Day

Let’s turn our campus into a playground of discovery!
This event brings hands-on science to ALL: demonstrations, guest lectures, open labs, and real experiments.

Who’s Invited:
- All students, faculty, and city residents.
- Schoolchildren attend special workshops for free.

Key Experiences:
- Liquid nitrogen magic, botanical wonders, chemistry with common items.
- “Ask a Scientist” tents, posters by PhD students.
- Take-home science kits for the first 300 kids.

Budget:
- 45% material kits & safety.
- 35% expert fees, guest speakers.
- 20% media coverage, food.

Every donor gets a personal badge and a video thank you from the students!
Spark a love for science—power Open Science Day!
`,
        targetAmount: getRandomAmount(70000, 140000),
        image:
          "https://images.unsplash.com/photo-1578988247672-da7397b0b2d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3BlbiUyMFNjaWVuY2UlMjBEYXl8ZW58MHx8MHx8fDA%3D",
        category: "Project",
      },

      {
        title: "Theater Club Revival",
        description: `
Stage the Dream: The Theater Club Revival

The curtain rises—help us revive campus theater!  
For many, the stage is a home for self-expression, inclusion, and hidden talents.

Who Benefits:
- 70+ theater club regulars and all workshop attendees.

Features:
- Costumes, set design, sound, and lighting upgrades.
- Monthly “Drama Nights” open to the entire college.
- Student-written plays premiering each semester.

Finance Plan:
- 55% costumes and sets.
- 30% venue and lighting upgrades.
- 15% director, guest coach fees.

Donors become “Patrons of Theatre” and all performances are dedicated in their honor.
Create stories, build confidence—support campus drama!
`,
        targetAmount: getRandomAmount(60000, 130000),
        image:
          "https://images.unsplash.com/photo-1588539016609-f8a62ef2a2ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRoZWF0ZXIlMjBDbHViJTIwUmV2aXZhbHxlbnwwfHwwfHx8MA%3D%3D",
        category: "Creative",
      },

      {
        title: "Green Innovations Expo",
        description: `
Pioneering Green: Student Innovations Expo

Students are leading India’s green revolution—showcase their work at our annual expo!

Who Gets Spotlighted:
- 40+ teams working on environmental tech, from smart irrigation to e-waste recycling.

Expo Features:
- Booths for clean tech demos and pilot products.
- Judges and grants from local cleantech companies.
- Workshops for all visitors on climate change mitigation.

Budget:
- 45% booth/event setup.
- 30% grants and prizes.
- 25% for food and awareness material.

Every donor helps a campus greener and wins a personal invite to the Expo.
Support tomorrow’s solutions, today!
`,
        targetAmount: getRandomAmount(100000, 180000),
        image:
          "https://images.unsplash.com/photo-1475584569679-60901c24d2be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fEdyZWVuJTIwSW5ub3ZhdGlvbnMlMjBFeHBvfGVufDB8fDB8fHww",
        category: "Project",
      },

      {
        title: "Coding Bootcamp Express",
        description: `
One Week, New Life: Coding Bootcamp Express

With just one week off and a hunger to learn, any student—no matter their branch—can become a coder.  
This bootcamp blends high-speed teaching, teamwork, and portfolio building.

Who Participates:
- 200 undergrads, selected for dedication and need.

Bootcamp Vision:
- Web and app dev from zero, plus AI intro modules.
- Final hackathon project and job-ready resume review.

Funding Use:
- 65% trainers and mentors.
- 20% learning material and dev tools.
- 15% for awarding laptops to top scorers.

Donors receive a “Built Future” badge and can attend the closing day demo.
Change a life—build a coder, launch a career!
`,
        targetAmount: getRandomAmount(105000, 165000),
        image:
          "https://images.unsplash.com/photo-1631624210938-539575f92e3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fENvZGluZyUyMEJvb3RjYW1wJTIwRXhwcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
        category: "Hackathon",
      },

      {
        title: "Creatives’ Equipment Grant",
        description: `
Creative Sparks: The Equipment Grant

What’s the value of a drawing tablet for a young artist or a guitar for a songwriter? Opportunity!  
Our equipment fund puts creative tools in the hands of students with talent but not the means.

Grant Features:
- Musicians, designers, digital artists, and film creators can all apply.
- 5 annual grants for big-ticket items, plus smaller tools.

Budget Plan:
- 60% equipment grants.
- 20% creative portfolio workshops.
- 20% for show costs.

Donors help build the next generation of India’s creative stars.
Let’s equip talent—give the gift of possibility!
`,
        targetAmount: getRandomAmount(50000, 110000),
        image:
          "https://images.unsplash.com/photo-1668700287442-599f7156bfb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q3JlYXRpdmVzJUUyJTgwJTk5JTIwRXF1aXBtZW50JTIwR3JhbnR8ZW58MHx8MHx8fDA%3D",
        category: "Creative",
      },

      {
        title: "Hack4India Tech Prize",
        description: `
Hack4India: Grand Prize for the National Problem-Solvers

The nation's brightest gather for 48 hours—who will solve India’s toughest challenges?

About the Hack:
- Teams tackle themes: rural fintech, health tech, inclusive education, and green energy.
- Panel of government, VC, and industry judges.
- Ongoing support for top 3 winners post-hack.

Prize Funding Breakdown:
- 70% prize money to teams.
- 20% in-kind: cloud credits, SWAG, and tools.
- 10% for follow-up mentoring.

Your gift makes the difference between a promising team and a real-world change-maker.
Sponsor the tech revolution!
`,
        targetAmount: getRandomAmount(170000, 300000),
        image:
          "https://images.unsplash.com/photo-1573166717911-d3625658b6f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEhhY2s0SW5kaWF8ZW58MHx8MHx8fDA%3D",
        category: "Hackathon",
      },
    ];

    const campaigns = [];
    const walletTransactionsToInsert = [];

    for (let i = 0; i < 35; i++) {
      const base =
        campaignTemplates[Math.floor(Math.random() * campaignTemplates.length)];
      const owner = getRandomUser(usersList);
      const donorNum = getRandomAmount(6, 15);
      const donorUsers = pickNDistinctUsers(usersList, donorNum, owner._id);
      let raised = 0;

      const donors = donorUsers.map((u) => {
        const amt = getRandomAmount(1000, base.targetAmount / donorNum + 2000);
        raised += amt;
        const donatedAt = new Date(
          Date.now() - getRandomAmount(0, 1000 * 60 * 60 * 24 * 60)
        );
        // Collect wallet transaction but DON'T save to DB yet
        walletTransactionsToInsert.push({
          userId: u._id,
          amount: amt,
          type: "DONATION",
          campaignTitle: base.title,
          createdAt: donatedAt,
        });
        return {
          userId: u._id,
          amount: amt,
          donatedAt,
        };
      });

      const status = getRandomStatus();
      // Fulfilled or closed should hit or exceed the goal
      let amountRaised = raised;
      let finalStatus = status;
      if (status === "fulfilled" || status === "closed") {
        amountRaised = base.targetAmount + getRandomAmount(0, 25000);
      }
      // Allow some active campaigns to be only half-way
      if (finalStatus === "open") {
        amountRaised = Math.floor(
          raised * (Math.random() > 0.6 ? 1 : Math.random() * 0.7 + 0.3)
        );
      }
      const amountWithdrawn = Math.floor(amountRaised * Math.random() * 0.5); // up to 50% withdrawn

      campaigns.push({
        title: base.title,
        description: base.description,
        targetAmount: base.targetAmount,
        amountRaised,
        amountWithdrawn,
        deadline: new Date(
          Date.now() + getRandomAmount(7, 90) * 24 * 60 * 60 * 1000
        ),
        status: finalStatus,
        category: base.category,
        image: base.image,
        createdBy: owner._id,
        donors,
      });
    }

    await Campaign.insertMany(campaigns);
    console.log(
      "Seeded",
      campaigns.length,
      "campaigns! Now updating donation stats & badges..."
    );

    if (walletTransactionsToInsert.length) {
      await WalletTransaction.insertMany(walletTransactionsToInsert);
      console.log(
        "Seeded",
        walletTransactionsToInsert.length,
        "wallet transactions!"
      );
    }

    // Gather campaign launches and donation records for each user
    const userStats = {}; // { userId: { donated: 0, donations: 0, created: 0 } }

    // All campaigns for donation & campaigner logic
    const allCampaigns = await Campaign.find({});

    // Count campaign ownership and donations per user
    allCampaigns.forEach((campaign) => {
      // Count as campaign owner
      const id = campaign.createdBy.toString();
      userStats[id] = userStats[id] || { donated: 0, donations: 0, created: 0 };
      userStats[id].created += 1;

      // Donor logic
      campaign.donors.forEach((donor) => {
        const donorId = donor.userId.toString();
        userStats[donorId] = userStats[donorId] || {
          donated: 0,
          donations: 0,
          created: 0,
        };
        userStats[donorId].donated += donor.amount;
        userStats[donorId].donations += 1;
      });
    });

    // Now assign badges EXACTLY matching the app's logic
    function assignBadges(stats) {
      const badges = new Set();
      if (stats.donations >= 1) badges.add("First Donation");
      if (stats.donations >= 3) badges.add("Contributor");
      if (stats.donated >= 1000) badges.add("Supporter");
      if (stats.created >= 1) badges.add("Campaigner");
      if (stats.created >= 3) badges.add("Fundraiser");
      return Array.from(badges);
    }

    // Update users with real badge names and donation stats
    const userUpdatePromises = Object.entries(userStats).map(
      async ([userId, stats]) =>
        User.findByIdAndUpdate(
          userId,
          {
            totalDonated: stats.donated,
            badges: assignBadges(stats),
          },
          { new: true }
        )
    );

    await Promise.all(userUpdatePromises);

    console.log("User stats and unified badge names updated for achievements!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error while seeding campaigns:", err);
    mongoose.connection.close();
  }
}

seedCampaigns();
