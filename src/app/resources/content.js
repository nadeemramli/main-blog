import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Nadeem",
  lastName: "Ramli",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Growth Dude",
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
    name: "X",
    icon: "x",
    link: "https://x.com/nadeemramli",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:m.nadeemramli@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Index`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>A Wannabe Product Manager</>,
  subline: (
    <>
      A dude at <InlineCode>checkpoint.xyz</InlineCode> where I build products. One day, I will stream on <InlineCode>twitch.tv/nadeemramli</InlineCode>.
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
    display: true,
    link: "https://cal.com/nadeemramli",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        - A results-driven growth marketer with a passion for building products.
        <br />
        - 4 years of experience in performance marketing.
        <br />
        - A self-taught product manager and surely a wannabe indie developer.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Checkpoint.xyz",
        timeframe: "2025 - Present",
        role: "Product Manager",
        achievements: [
          <>
            Undefined.
          </>,
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
        company: "FAR Capital Sdn. Bhd.",
        timeframe: "March 2023 - November 2024",
        role: "Digital Marketing Manager / Technical Marketer",
        achievements: [
          <>
            Technical Product Manager, overseeing the whole far.academy ecosystem and 
            lead gen campaign for the event “Sunday Session”.
          </>,
          <>
            A lot of other stuff too.
          </>,
        ],
        images: [
          {
            src: "/images/resume/farcapital.png",
            alt: "FAR Capital Sdn. Bhd.",
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
        company: "Adasight B.V.",
        timeframe: "May 2023 - November 2023",
        role: "Growth/Product Marketer",
        achievements: [
          <>
             Managing the whole demand generation activities for the startup to find more ICP.  Land 4 big client and reached monthly KPIs.
          </>,
          <>
            Improve the website's value proposition, deep dig in keyword semantics for startup positioning.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/resume/adasight.png",
            alt: "Adasight B.V.",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Group M / WPP",
        timeframe: "March 2022 - July 2022",
        role: "Performance Marketer",
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
        company: "NCIG (M) Sdn. Bhd.",
        timeframe: "September 2021 - March 2022",
        role: "Performance Marketer",
        achievements: [
          <>
            DTC Industry, Sales-led Growth, Marketing Analytics, Marketing Automation,
            Product Launch, Demographic Expansion, Community Building, Email/SMS Marketing.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/resume/ncig.jpg",
            alt: "NCIG (M) Sdn. Bhd.",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Monocal Sdn. Bhd",
        timeframe: "February 2021 - August 2021",
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
            alt: "Monocal Sdn. Bhd",
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
};

const blog = {
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
      link: "https://trial-and-error.nadeemramli.com"
    },
    {
      title: "Library of Mental Models",
      description: "A collection of mental models, distilled from the best books.",
      imageSrc: "/images/resources/mental-models.png",
      link: "https://nadeemramli.notion.site/mental-models-library"
    },
  ]
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
