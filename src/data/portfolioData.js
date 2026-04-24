// All personal content lives here — update in one place.

export const profile = {
  name: "Gitishan Biswal",
  shortName: "GITISHAN",
  handle: "@gitishan",
  roles: [
    "Programmer Analyst",
    "Full-Stack Engineer",
    "AI & Data Enthusiast",
    "Creative Technologist",
    "Problem Solver"
  ],
  tagline:
    "Engineering dependable software at the intersection of clean architecture, intelligent systems, and thoughtful design.",
  bioLong: [
    "I'm Gitishan Biswal — a Computer Science graduate from KIIT University and a Programmer Analyst at Cognizant, where I help build and deliver enterprise-grade software for global clients.",
    "My focus is turning ambiguous problems into reliable, well-crafted products: full-stack web applications, data-driven pipelines, and interfaces that feel considered end-to-end.",
    "Beyond engineering, I lead creative teams, direct short-form video content, and enjoy pushing the boundaries of what modern browsers can render."
  ],
  status: "Open to Opportunities",
  location: "India · Remote-Friendly",
  email: "gitishan@yahoo.com",
  phone: "+91 6370-229496",
  socials: {
    linkedin: "https://www.linkedin.com/in/gitishan/",
    email:    "mailto:gitishan@yahoo.com"
  },
  cvUrl: "/Resume_Gitishan.pdf",
  photo:  "/MYPIC.jpeg"
};

export const stats = [
  { label: "Years Building",   value: 3,  suffix: "+" },
  { label: "Projects Shipped", value: 3,  suffix: "+" },
  { label: "Technologies",     value: 15, suffix: "+" },
  { label: "Certifications",   value: 4,  suffix: "" }
];

export const navLinks = [
  { id: "home",           label: "Home" },
  { id: "about",          label: "About" },
  { id: "skills",         label: "Skills" },
  { id: "projects",       label: "Projects" },
  { id: "experience",     label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact",        label: "Contact" }
];

// Skill rows — purely for marquee layout. Row labels are not displayed.
export const skillRows = [
  [
    { name: "React",      icon: "SiReact" },
    { name: "HTML",       icon: "SiHtml5" },
    { name: "CSS",        icon: "SiCss" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "Java",       icon: "FaJava" },
    { name: "GitHub",     icon: "SiGithub" }
  ],
  [
    { name: "Python",          icon: "SiPython" },
    { name: "TensorFlow",      icon: "SiTensorflow" },
    { name: "Claude",          icon: "SiAnthropic" },
    { name: "GitHub Copilot",  icon: "SiGithubcopilot" },
    { name: "Google Cloud",    icon: "SiGooglecloud" }
  ],
  [
    { name: "SQL",          icon: "FaDatabase" },
    { name: "MySQL",        icon: "SiMysql" },
    { name: "PL/SQL",       icon: "OracleLogo" },
    { name: "Oracle Cloud", icon: "OracleLogo" }
  ]
];

export const projects = [
  {
    title: "Stock Market Prediction",
    category: "Full-Stack",
    featured: true,
    description:
      "AI-powered system using CNN, ANN, LSTM and Random Forest to forecast market trends. Achieved 90%+ accuracy through careful pre-processing and feature selection.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    live:   "#"
  },
  {
    title: "Gemini AI Clone",
    category: "Frontend",
    featured: true,
    description:
      "A full-stack replica of Google Gemini — pixel-perfect UI, real-time responses, and integrated APIs for attractions and dining recommendations.",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=900&q=80",
    tech: ["React", "Node.js", "REST API", "CSS3"],
    live:   "#"
  },
  {
    title: "Ola Analytics Dashboard",
    category: "Full-Stack",
    featured: true,
    description:
      "End-to-end analytics pipeline — SQL data models, Excel for cleaning & transformation, Power BI for interactive real-time visualization.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    tech: ["SQL", "Power BI", "Excel"],
    live:   "#"
  }
];

export const projectFilters = ["All", "Frontend", "Full-Stack"];

export const experiences = [
  {
    role: "Programmer Analyst Trainee",
    company: "Cognizant",
    date: "Jun 2025 — Present",
    current: true,
    bullets: [
      "Shipping enterprise-grade software solutions for client engagements.",
      "Collaborating with cross-functional teams on large-scale application development.",
      "Absorbing best practices for scalable, maintainable production systems."
    ]
  },
  {
    role: "Sales & Marketing Intern",
    company: "HighRadius",
    date: "May 2024 — Jun 2024",
    current: false,
    bullets: [
      "Built marketing strategies that lifted brand visibility and engagement metrics.",
      "Analyzed audience preferences using data to inform lead-gen campaigns.",
      "Produced targeted promotional materials across multiple channels."
    ]
  },
  {
    role: "Video Editing Team Lead",
    company: "Google Developers Student Club (GDSC)",
    date: "Jun 2022 — Jul 2025",
    current: false,
    bullets: [
      "Led a team of video editors to create high-quality promotional content.",
      "Partnered with marketing to drive event attendance and online engagement.",
      "Mentored junior members on creative pipelines and project delivery."
    ]
  }
];

export const certifications = [
  {
    name: "Oracle Fusion AI Agent Studio Certified Developer Professional",
    issuer: "Oracle",
    date: "2026",
    id: "ORACLE-AI-AGENT-STUDIO",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=88D05980A489FEA85B6C6601B84D24E328918CD828034BFFCBDE2A02115056D2"
  },
  {
    name: "Oracle Fusion Cloud Applications HCM Process Essentials",
    issuer: "Oracle",
    date: "2026",
    id: "ORACLE-HCM-ESSENTIALS",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=16E346C257FAFE52A88E7E89DA78E02DF7CAEB1C061C679459AD84F91E8AEB3B"
  },
  {
    name: "Google Cloud Computing Foundation",
    issuer: "Google Cloud",
    date: "2024",
    id: "CREDLY-E0C38B96",
    url: "https://www.credly.com/badges/e0c38b96-6900-4d09-abd5-ed1088583559"
  },
  {
    name: "Data Analytics and Visualization",
    issuer: "Forage",
    date: "2024",
    id: "DA-VIZ-2024",
    url: "https://drive.google.com/file/d/1mq1tZT_2UImgZaJsSXv6NYABBSw_WfKq/view"
  }
];

export const education = [
  {
    school: "Kalinga Institute of Industrial Technology (KIIT)",
    degree: "B.Tech, Computer Science & Engineering",
    date: "2021 — 2025",
    detail: "Coursework: DSA, Algorithms, Machine Learning, Web Development, Artificial Intelligence"
  },
  {
    school: "Delhi Public School",
    degree: "Science Stream (PCM + Biology)",
    date: "2009 — 2021",
    detail: "Physics, Chemistry, Mathematics, Biology"
  }
];
