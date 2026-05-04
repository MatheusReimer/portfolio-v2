export const profile = {
  name: "Matheus Reimer",
  role: "Software Engineer",
  location: "Blumenau, Santa Catarina, Brazil",

  summary:
    "Software engineer with experience building and maintaining scalable web applications for enterprise clients. Specializes in modern front-end development with Nuxt.js and Vue.js, with a background in C#, Angular, and full-stack development.",

  about:
    "I started as an IT support intern — fixing servers, maintaining computers, printers, all kinds of machines. No real development experience yet, just two years of learning how things break and how to stay calm when they do. From there I started picking up dev work on the side for friends. Nothing to write home about, but enough to give me the confidence to apply for a junior role — which I eventually got.",

  background:
    "I spent two years at a chatbot company writing C# and JavaScript APIs, automating workflows and integrating systems for large pharma and retail clients. During that time I landed a scholarship to study and work abroad at DIT — Deggendorf Institute of Technology in Germany. That was a turning point. It changed how I thought about software and opened doors to international work. When I felt I'd hit a ceiling on what I could learn in that role, I joined a US-based company where I work today — more variety, more ownership, more interesting problems. That's where I am now.",

  whyCardGame:
    "Card games, RPGs, stories — they've always been my thing. There's something about systems with rules, choices, and consequences that I find genuinely compelling. So when I built this portfolio, making it a boring list of projects was never an option. I still miss building things just for the fun of it. When I get the chance to work on my own projects, I throw everything into making them as interesting as possible. This is one of those.",

  personality:
    "I like making boring things less boring. Give me a standard problem and I'll look for the version that's actually interesting to build. I care about performance, clean architecture, and not shipping garbage — but I also think software should be enjoyable to use, not just functional.",

  stats: [
    { label: "Monthly requests", value: "35M+" },
    { label: "Unique users / mo", value: "400k+" },
    { label: "Years shipping", value: "5+" },
    { label: "Stacks shipped", value: "5+" },
  ],

  interests: [
    "Yu-Gi-Oh / TCG",
    "Tabletop RPGs",
    "Side projects",
    "Performance tuning",
    "Unconventional UX",
  ],

  github: "https://github.com/MatheusReimer",
  linkedin: "https://www.linkedin.com/in/matheus-reimer-636b10187/",
  email: "matheusreimer1@gmail.com",

  stack: ["Nuxt.js", "Vue.js", "TypeScript", "Angular", "C# / .NET", "Node.js", "React", "Python / Django"],

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Professional" },
  ],

  experience: [
    {
      role: "Software Engineer",
      company: "Thinklogic",
      period: "Mar 2023 – Present",
      location: "Remote · USA",
      stack: ["Nuxt.js", "Vue.js", "TypeScript", "C#", "Angular"],
      highlight: "Full-stack engineer on a global marketing platform serving 400k+ unique monthly users and 35M+ monthly requests.",
      bullets: [
        { text: "Independently designed and built a prefetched Nuxt.js version of the platform from scratch — achieving Lighthouse 90+ across 13,000+ pages, effectively neutralising DDoS exposure and eliminating backend load on page requests.", url: "https://www.chatsworth.com" },
        { text: "Engineered an automated CMS translation pipeline using Google Gemini, clearing a translation backlog across all international locales in days rather than quarters.", url: "https://www.exemplars.health/" },
        { text: "Replaced Azure Search with Algolia — integrated with GTM and GA4 for full search analytics, and enabled the client's marketing team to manage rankings independently.", url: "https://www.chatsworth.com" },
        { text: "Led a 2-person team to redesign and migrate 40 CMS pages in 21 days, 9 days ahead of a hard non-negotiable deadline, incorporating AI tooling throughout the workflow.", url: "https://www.jndla.com/" },
        { text: "Built a factory-pattern data normalisation layer that unified data from 2 CMS platforms and 2 databases into a single typed schema consumed by the entire frontend.", url: "https://manatt.com" },
      ],
    },
    {
      role: "Chatbot Developer · Junior",
      company: "Take Blip",
      period: "Sep 2021 – Apr 2023 · 1 yr 8 mos",
      location: "Brazil · Full-time",
      stack: ["C#", ".NET", "JavaScript", "REST APIs"],
      highlight: "Developed chatbots and backend APIs for enterprise clients across health, retail, and finance sectors.",
      bullets: [
        { text: "Part of a team that built and maintained chatbots handling over 3,000 interactions per minute for large-scale enterprise clients." },
        { text: "Created C# / .NET and JavaScript APIs that connected client backend services to chatbot conversation flows, retrieving and transforming data in real time." },
        { text: "Worked on projects for health-sector clients where uninterrupted, accurate communication was business-critical." },
        { text: "Implemented automated testing, code quality gates, and security reporting as part of the CI pipeline." },
        { text: "Collaborated directly with executive teams and senior management across IT, Marketing, and Sales to align technical delivery with business needs." },
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Freelance",
      period: "Feb 2021 – Sep 2021 · 8 mos",
      location: "Balneário Piçarras, Brazil · Self-employed",
      stack: ["JavaScript", "Node.js", "React", "Python", "Django", "HTML", "CSS"],
      highlight: "Designed, built, and deployed 5 websites end-to-end in 6 months, before entering the industry professionally.",
      bullets: [
        { text: "Sole developer on all projects — handled requirements, design, frontend, backend, databases, and deployment." },
        { text: "Adapted the tech stack and deployment platform per project based on client goals and budget." },
        { text: "Built a full-stack personal trainer website (pavanellopersonal.com.br) using Node.js, HTML, and CSS.", url: "https://pavanellopersonal.com.br" },
        { text: "Built a real estate agency platform using Python (Django), React, and SCSS." },
      ],
    },
    {
      role: "Engineer Intern",
      company: "Grupo Gmaes",
      period: "Nov 2019 – Feb 2021 · 1 yr 4 mos",
      location: "Itajaí, Santa Catarina, Brazil",
      stack: ["Linux", "Windows Server", "Networking"],
      highlight: "IT support internship — the starting point. Learned how systems fail before learning how to build them.",
      bullets: [
        { text: "Supported implementation and troubleshooting of Linux and Windows servers." },
        { text: "Diagnosed and resolved issues across email systems, machines, networks, and general infrastructure." },
        { text: "Handled client support and internal technical requests on a daily basis." },
        { text: "Managed reports and monitoring for recurring system issues." },
      ],
    },
  ],
};

export const levels = [
  { level: 1, label: "Initiate", xpRequired: 0 },
  { level: 2, label: "Engineer", xpRequired: 20 },
  { level: 3, label: "Builder", xpRequired: 40 },
  { level: 4, label: "Architect", xpRequired: 65 },
  { level: 5, label: "Tech Lead", xpRequired: 85 },
];
