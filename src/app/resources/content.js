import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Nadeem",
  lastName: "Ramli",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Growth Marketer. Indie Builder. Systems Thinker.",
  avatar: "/images/avatar.jpg",
  location: "Asia/Kuala_Lumpur", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa Melayu"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Bunch of goodies.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/nadeemramli/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mnadeemramli/",
  },
  {
    name: "Twitter",
    icon: "x",
    link: "https://x.com/nadeemramli",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/nadeemramli/",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://threads.com/@nadeemramli",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    link: "https://tiktok.com/@nadeemramli",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:m.nadeemramli@gmail.com",
  },
];

const projects = {
  title: "Projects",
  description: "A collection of projects and experiments I've worked on.",
  label: "Projects"
};

const home = {
  label: "Home",
  title: `${person.name}'s Index`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>A Marketer and a Product Developer</>,
  subline: (
    <>
      I build useful digital products. Currently writing the{" "}
      <a href="https://essays.nadeemramli.com" target="_blank" rel="noopener noreferrer">Order Series</a>.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false, // "Schedule a Call" retired site-wide (content revision 2026-06)
    link: "https://cal.com/nadeemramli",
  },
  hero: {
    display: true,
    title: "Growth Marketer. Indie Builder. Systems Thinker.",
    tagline: "I help ideas grow into real products through data, iteration, and meaningful user insights.",
    primaryCTA: [
      {
        label: "Email me",
        href: "mailto:m.nadeemramli@gmail.com",
        variant: "secondary"
      }
    ]
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p>
          I&apos;m a results-driven growth marketer with five years of experience
          across e-commerce, SaaS, healthcare, and agency consulting.
        </p>
        <p>
          I build marketing systems end-to-end — from North Star Metrics and
          Value Architecture down to the martech infrastructure that brings the
          strategy to life. My approach blends data, creativity, and systems
          thinking, and I&apos;ve managed ad spend of up to RM2M across Meta and
          Google.
        </p>
        <p>
          What sets my work apart is an ecosystem-level perspective: I don&apos;t
          just run campaigns — I architect the channels, tools, and operations
          around one growth strategy. I&apos;m big on mental models and
          multidisciplinary thinking.
        </p>
        <p>
          Day-to-day, you&apos;ll find me thinking across channels, tools, and
          operations — wiring them around a single growth strategy so the whole
          system works as one.
        </p>
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "2X",
        timeframe: "Aug 2025 — Present",
        role: "Marketing Operations Specialist",
        location: "Hybrid",
        achievements: [
          <>
            Marketing ops across enterprise education clients — analytics, CRO,
            growth strategy.
          </>,
        ],
        images: [],
      },
      {
        company: "Checkpoint.xyz",
        timeframe: "2025 — Present",
        role: "Product Manager",
        badge: "Indie",
        achievements: [
          <>Building DayLog and the Mapping of Metrics dashboard.</>,
        ],
        images: [
          {
            src: "/images/projects/daylog/1.png",
            alt: "DayLog",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/mapping-of-metrics/1.png",
            alt: "Mapping of Metrics",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Teroka Digital",
        timeframe: "Jan 2022 — Dec 2025",
        role: "Growth / Freelancer",
        location: "Remote",
        achievements: [
          <>
            Freelance practice for SMEs: strategy, comms planning, campaign PM,
            and martech implementation — Notion systems, analytics visibility,
            workflow.
          </>,
        ],
        images: [],
      },
      {
        company: "FAR Capital",
        timeframe: "Mar 2023 — Nov 2024",
        role: "Digital Marketing Manager",
        location: "KL / Remote",
        achievements: [
          <>
            Technical Product Manager, overseeing the whole far.academy ecosystem and
            lead gen campaign for the event "Sunday Session".
          </>,
          <>
            A lot of other stuff too.
          </>,
        ],
        images: [
          {
            src: "/images/resume/farcapital.png",
            alt: "FAR Capital",
            width: 16,
            height: 9,
          },
          {
            src: "/images/resume/faracademy.png",
            alt: "FAR Academy",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Adasight",
        timeframe: "Jun 2023 — Oct 2023",
        role: "Growth Marketer",
        location: "Amsterdam / Remote",
        achievements: [
          <>
            Managing the whole demand generation activities for the startup to find more ICP. Land 4 big client and reached monthly KPIs.
          </>,
          <>
            Improve the website's value proposition, deep dig in keyword semantics for startup positioning.
          </>,
        ],
        images: [
          {
            src: "/images/resume/adasight.png",
            alt: "Adasight",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "GroupM",
        timeframe: "Mar 2022 — Jul 2022",
        role: "Performance Marketing Executive",
        achievements: [
          <>
            Media Buying, Media Planning, Marketing Analytics, Scaled-Up Marketing Operation,
            AdOps, Excel, Reporting.
          </>,
          <>
            It's cool to work with the best of the best. Corporate-wise.
          </>,
        ],
        images: [],
      },
      {
        company: "NCIG (M) Sdn Bhd",
        timeframe: "Aug 2021 — Jan 2022",
        role: "Digital Marketing Executive",
        achievements: [
          <>
            DTC Industry, Sales-led Growth, Marketing Analytics, Marketing Automation,
            Product Launch, Demographic Expansion, Community Building, Email/SMS Marketing.
          </>,
        ],
        images: [
          {
            src: "/images/resume/ncig.jpg",
            alt: "NCIG (M) Sdn Bhd",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Monocal",
        timeframe: "Feb 2021 — Aug 2021",
        role: "Growth Strategist",
        achievements: [
          <>
            Growth Strategy, B2B Marketing, User Research, Google Ads,
            Google Analytics, Google Tag Manager, Facebook Ads, Facebook Pixel,
            Chatbot, Content Marketing, Automation.
          </>,
          <>
            Paying tribute to the OG agency, cause that's where I started.
          </>,
        ],
        images: [
          {
            src: "/images/resume/monocal.jpg",
            alt: "Monocal",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "GTM Tactics",
        description: <>Performance-based Growth, A bit of PLG, Virality-based Growth</>,
        images: [
          /*{
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },*/
        ],
      },
      {
        title: "Marketing Analytics",
        description: <>GTM, GA, CRO Tools (Hotjar, PostHog, Clarity,etc)</>,
        images: [
          /*{
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },*/
        ],
      },
      {
        title: "Performance Marketing",
        description: <>Google Ads, Facebook Ads, TikTok Ads, LinkedIn Ads, etc.</>,
        images: [
        ],
      },
      {
        title: "No-Code Tools, Automation",
        description: <>Python, Notion, Google Sheets, etc.</>,
        images: [
          /*{
            src: "/images/skills/notioncert.png",
            alt: "Notion",
            width: 16,
            height: 9,
          },*/
        ],
      },
      {
        title: "Product Analytics",
        description: <>Amplitude, PostHog, etc.</>,
        images: [
        ],
      },
    ],
  },
  sideProjects: {
    display: true,
    title: "Side Projects",
    projects: [
      {
        name: "Consumer Wellness Brand",
        role: "Builder",
        description: "Building a consumer wellness brand with a partner.",
        status: "In Development",
      },
      {
        name: "Book Series",
        role: "Writer",
        description: "Writing the Order Series.",
        status: "Active",
        link: "https://essays.nadeemramli.com",
      },
      {
        name: "Metrics Management Dashboard",
        role: "Product Developer",
        description: "Auto-reporting dashboard for performance marketers",
        status: "Prototype",
      },
    ]
  },
  howIWork: {
    display: true,
    title: "How I Work",
    subtitle: "My systematic approach to building and marketing products",
    steps: [
      {
        number: 1,
        title: "Define the core problem",
        description: "Before building anything, I dig deep to understand the real problem users face. No assumptions, just research.",
        icon: "search",
        details: [
          "User interviews and surveys",
          "Market research and competitive analysis",
          "Problem validation through data"
        ]
      },
      {
        number: 2,
        title: "Align metrics to user behavior",
        description: "I establish clear success metrics that reflect actual user value, not vanity metrics.",
        icon: "target",
        details: [
          "Define leading vs lagging indicators",
          "Set up proper tracking and attribution",
          "Focus on metrics that matter to business outcomes"
        ]
      },
      {
        number: 3,
        title: "Launch with focus, test fast",
        description: "Start small, launch early, and iterate based on real user feedback and data.",
        icon: "rocket",
        details: [
          "MVP approach with core features only",
          "A/B testing for optimization",
          "Rapid experimentation cycles"
        ]
      },
      {
        number: 4,
        title: "Evaluate by MER, retention, feedback",
        description: "Success isn't just about acquisition - it's about sustainable growth and user satisfaction.",
        icon: "chart",
        details: [
          "Marketing Efficiency Ratio (MER) analysis",
          "Cohort retention analysis",
          "Qualitative feedback loops"
        ]
      },
      {
        number: 5,
        title: "Systematize what works",
        description: "Once something works, I document it, automate it, and scale it systematically.",
        icon: "settings",
        details: [
          "Process documentation and SOPs",
          "Marketing automation setup",
          "Scalable systems and workflows"
        ]
      }
    ]
  },
  builderPrinciples: {
    display: false, // section removed (the essays cover it)
    title: "My Builder Principles",
    subtitle: "The core beliefs that guide my approach to building and marketing",
    principles: [
      {
        title: "Build fast, test smarter",
        description: "Speed of iteration beats perfect planning. Test assumptions early and often.",
        icon: "lightning"
      },
      {
        title: "No metrics without meaning",
        description: "Every metric should tie back to user value and business outcomes. Vanity metrics are just noise.",
        icon: "target"
      },
      {
        title: "PLG + Ads = Amplified Growth",
        description: "Product-led growth provides the foundation, paid ads provide the amplification.",
        icon: "trending-up"
      },
      {
        title: "Respect user time and attention",
        description: "Every interaction should provide value. Users' time is precious, don't waste it.",
        icon: "clock"
      },
      {
        title: "Iterate based on behavior, not hope",
        description: "User behavior reveals truth. Opinions and assumptions can be misleading.",
        icon: "repeat"
      }
    ]
  },
  toolsStack: {
    display: true,
    title: "Tools & Stack",
    subtitle: "The switchboard — what's wired in, by function",
    categories: [
      { category: "Paid Acquisition", tools: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads"] },
      { category: "Retention", tools: ["Klaviyo", "Brevo", "Discord", "AWS SES"] },
      { category: "Web", tools: ["WordPress", "Shopify", "React"] },
      { category: "Analytics & Experimentation", tools: ["GTM/GA4", "PostHog", "Mixpanel", "Amplitude", "Optimizely"] },
      { category: "Behavior & Heatmaps", tools: ["Hotjar", "Clarity", "Mouseflow"] },
      { category: "CRM & Automation", tools: ["n8n", "HubSpot", "Bouncer", "Make.com"] },
      { category: "Data Pipeline", tools: ["Airbyte", "MotherDuck"] },
    ]
  },
  finalCTA: {
    display: false, // section removed; the global footer carries the CTA
    title: "Let's Build Together",
    description: "I'm always excited to work on meaningful projects that solve real problems. Whether you need help with growth strategy, product development, or just want to brainstorm ideas, I'd love to connect.",
    buttons: [
      {
        label: "Email Me",
        href: "mailto:m.nadeemramli@gmail.com",
        variant: "secondary"
      },
      {
        label: "Follow on Twitter",
        href: "https://x.com/nadeemramli",
        variant: "secondary"
      }
    ],
    tags: []
  }
};

const resources = {
  label: "Resources",
  title: "Useful Resources & Links",
  description: `A collection of helpful resources curated by ${person.name}`,
  resources: [
    {
      title: "Essays",
      description: "My digital garden, which is a collection of my essays on various topics.",
      imageSrc: "/images/resources/essays.png",
      link: "https://essays.nadeemramli.com"
    },
    {
      title: "Digital Library",
      description: "Book summaries and notes.",
      imageSrc: "/images/resources/digital-library.png",
      link: "https://curation.nadeemramli.com"
    },
    {
      title: "Trial and Error",
      description: "My journal of product development, growth marketing and design",
      imageSrc: "/images/resources/trial-and-error.png",
      link: "https://build.nadeemramli.com"
    },
    {
      title: "Projects",
      description: "A collection of projects and experiments I've worked on.",
      imageSrc: "/images/resources/projects.png",
      link: "https://projects.nadeemramli.com"
    },
    {
      title: "Library of Mental Models",
      description: "A collection of mental models, distilled from the best books.",
      imageSrc: "/images/resources/mental-models.png",
      link: "https://nadeemramli.notion.site/mental-models-library"
    },
  ]
};

const blog = {
  label: "Blog",
  title: "Blog",
  description: "Long-form case studies and build logs.",
};

const now = {
  title: "🕒 What I'm Working On Now",
  description: "Let people see where you are right now in your journey. Inspired by Derek Sivers' Now page. This makes it easy to contextualize your work as active, focused, and evolving.",
  
  // Section 1: Current Focus
  currentFocus: {
    display: true,
    title: "Current Focus",
    essay: "Right now, I'm in a phase of deliberate skill building and product development. After years of working in growth marketing, I've realized that sustainable success comes from building deep, interconnected capabilities rather than just tactical execution. I'm currently balancing three major initiatives while systematically developing my foundational skills across multiple layers of expertise.",
    items: [
      "Building Dealn, getting the MVP done so we can get those trials and feedback",
      "Working on my YouTube Channel",
      "Prototyping a Metrics Management dashboard for Performance Marketer, Auto-reporting, easier growth forecasting."
    ]
  },

  // Section 2: Meta Layer
  metaLayer: {
    display: true,
    title: "Meta - How I Learn & Evolve",
    description: "The philosophical foundation that governs my approach to growth and learning.",
    approach: "I believe in compound learning - where each skill amplifies the others. My meta-approach focuses on building learning systems rather than just acquiring knowledge. I treat my development like a product, with deliberate experimentation, feedback loops, and systematic iteration.",
    skills: [
      {
        name: "Learning Systems",
        mastered: 7,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Self-Reflection",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Adaptability",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Pattern Recognition",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Feedback Integration",
        mastered: 8,
        developing: 9,
        maxValue: 10
      }
    ]
  },

  // Section 3: Fundamental Layer
  fundamentalLayer: {
    display: true,
    title: "Fundamental - Timeless Disciplines",
    description: "Core knowledge areas that shape worldview and thinking patterns.",
    approach: "I focus on building strong fundamentals because they compound over time and transfer across domains. Each cluster reinforces the others - mental reasoning informs decision theory, which guides quantitative analysis, which shapes systems thinking.",
    clusters: [
      {
        name: "Mental Reasoning",
        mastered: 0, // calculated from fields
        developing: 0, // calculated from fields
        maxValue: 10,
        fields: [
          { name: "Psychology", mastered: 6, developing: 8, maxValue: 10 },
          { name: "Language", mastered: 7, developing: 8, maxValue: 10 },
          { name: "Philosophy", mastered: 4, developing: 6, maxValue: 10 },
          { name: "Values", mastered: 8, developing: 9, maxValue: 10 },
          { name: "Persuasion", mastered: 7, developing: 8, maxValue: 10 }
        ]
      },
      {
        name: "Quantitative Reasoning",
        mastered: 0,
        developing: 0,
        maxValue: 10,
        fields: [
          { name: "Economics (Micro)", mastered: 6, developing: 7, maxValue: 10 },
          { name: "Economics (Macro)", mastered: 5, developing: 7, maxValue: 10 },
          { name: "Accounting", mastered: 4, developing: 6, maxValue: 10 },
          { name: "Statistics", mastered: 7, developing: 8, maxValue: 10 },
          { name: "Math", mastered: 6, developing: 7, maxValue: 10 },
          { name: "Analytics", mastered: 8, developing: 9, maxValue: 10 }
        ]
      },
      {
        name: "Systems & Tech",
        mastered: 0,
        developing: 0,
        maxValue: 10,
        fields: [
          { name: "Systems Engineering", mastered: 5, developing: 7, maxValue: 10 },
          { name: "Project Management", mastered: 7, developing: 8, maxValue: 10 },
          { name: "Mechatronics", mastered: 3, developing: 5, maxValue: 10 },
          { name: "LLMs", mastered: 6, developing: 8, maxValue: 10 },
          { name: "Software Architecture", mastered: 5, developing: 7, maxValue: 10 }
        ]
      },
      {
        name: "Epistemology",
        mastered: 0,
        developing: 0,
        maxValue: 10,
        fields: [
          { name: "Mental Models", mastered: 8, developing: 9, maxValue: 10 },
          { name: "Sensemaking", mastered: 7, developing: 8, maxValue: 10 },
          { name: "Critical Thinking", mastered: 8, developing: 9, maxValue: 10 },
          { name: "Truth Filters", mastered: 6, developing: 8, maxValue: 10 },
          { name: "Information Processing", mastered: 7, developing: 8, maxValue: 10 }
        ]
      },
      {
        name: "Decision Theory",
        mastered: 0,
        developing: 0,
        maxValue: 10,
        fields: [
          { name: "Game Theory", mastered: 5, developing: 7, maxValue: 10 },
          { name: "Finance", mastered: 6, developing: 7, maxValue: 10 },
          { name: "Constraint Management", mastered: 7, developing: 8, maxValue: 10 },
          { name: "Prioritization", mastered: 8, developing: 9, maxValue: 10 },
          { name: "Risk Assessment", mastered: 6, developing: 8, maxValue: 10 }
        ]
      }
    ]
  },

  // Section 4: Strategic Layer
  strategicalLayer: {
    display: true,
    title: "Strategic - Applied Synthesis",
    description: "Mental maps and frameworks for decision-making across different domains.",
    approach: "Strategy is where theory meets reality. I develop frameworks that help me navigate complex decisions by synthesizing fundamental knowledge into actionable mental maps. Each strategic skill represents a different lens for analyzing problems.",
    skills: [
      {
        name: "Market Analysis",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Product Strategy",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Growth Strategy",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Business Model Design",
        mastered: 6,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Competitive Positioning",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Resource Allocation",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Ecosystem Thinking",
        mastered: 6,
        developing: 8,
        maxValue: 10
      }
    ]
  },

  // Section 5: Tactical Layer
  tacticalLayer: {
    display: true,
    title: "Tactical - Execution Systems",
    description: "Tools, channels, and systems that bring strategy to life through execution.",
    approach: "Tactics without strategy are chaos, but strategy without tactics is just wishful thinking. I focus on building execution systems that can adapt as strategies evolve. The key is creating repeatable processes that consistently deliver results.",
    skills: [
      {
        name: "Performance Marketing",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Analytics Implementation",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "Content Systems",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Marketing Automation",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "A/B Testing",
        mastered: 8,
        developing: 9,
        maxValue: 10
      },
      {
        name: "CRO Implementation",
        mastered: 7,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Tool Integration",
        mastered: 6,
        developing: 8,
        maxValue: 10
      },
      {
        name: "Process Optimization",
        mastered: 7,
        developing: 8,
        maxValue: 10
      }
    ]
  }
};

// Operator Console data (design.md §6.1, §6.3) — feeds the home hero console
// and the /now page.
const consoleData = {
  focus: {
    label: "Current Focus",
    value: "Order Series",
    // Gauge semantics: installments DRAFTED ÷ installments PLANNED, as a
    // percentage. Keep this number honest — update it whenever an
    // installment is drafted or the plan changes.
    // TODO(nadeem): set the real ratio; 50 is a placeholder.
    gaugePercent: 50,
  },
  stats: [
    { label: "YRS EXP", value: "5" },
    { label: "CURRENT", value: "ORDER SERIES" },
    { label: "LOCAL", value: null }, // null = rendered as the live clock
    { label: "STATUS", value: "ONLINE" },
  ],
  // Newest first.
  nowLog: [
    { date: "2026-06", entry: "ORDER SERIES — writing & polishing" },
    { date: "2026-06", entry: "2X — marketing operations" },
    { date: "2026-06", entry: "ACCA — exam prep" },
    { date: "2026-06", entry: "WELLNESS BRAND — building with a partner" },
    { date: "2026-06", entry: "FREEDOM FUND — compounding" },
  ],
  // /now page (design.md §6.3) — manual freshness date: update whenever the
  // status content changes. Reports content freshness, NOT deploy freshness.
  updated: "2026-06-11",
  // The /now status log — richer than the home now-log. Newest first.
  statusLog: [
    { date: "2026-06", entry: "ORDER SERIES — writing & polishing" },
    { date: "2026-06", entry: "2X — marketing operations" },
    { date: "2026-06", entry: "ACCA — exam prep" },
    {
      date: "2026-06",
      entry: "28 FFMI — physique goal",
      link: "https://essays.nadeemramli.com",
    },
    { date: "2026-06", entry: "BUILDING WITH AI" },
    { date: "2026-06", entry: "SIDE-HUSTLE INCOME — active" },
    { date: "2026-06", entry: "FREEDOM FUND — compounding" },
  ],
  // EQUITY layer readouts (design.md §5.10) — qualitative/factual values
  // only; never invented proficiency scores.
  equity: [
    // Qualitative by design — the paper count stays private.
    { label: "ACCA", value: "IN PROGRESS" },
    { label: "ORDER SERIES", value: null }, // null = computed from focus.gaugePercent
    { label: "FREEDOM FUND", value: "COMPOUNDING" },
    { label: "SIDE INCOME", value: "ACTIVE" },
  ],
  // M–S; Saturday is ship day.
  shippingWeek: [
    { day: "M", mark: "build" },
    { day: "T", mark: "build" },
    { day: "W", mark: "build" },
    { day: "T", mark: "build" },
    { day: "F", mark: "build" },
    { day: "S", mark: "ship" },
  ],
};

export { person, social, newsletter, home, about, projects, resources, blog, now, consoleData };
