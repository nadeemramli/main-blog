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
  headline: <>A Wannabe Product Manager & Indie Hacker</>,
  subline: (
    <>
      I'm Nadeem, a growth dude at <InlineCode>checkpoint.xyz</InlineCode>, where I build products. After hours, I stream on <InlineCode>twitch.tv/nadeemramli</InlineCode>.
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
        A results-driven growth marketer with a passion for building products, and 4 years of experience in performance marketing.
        <br />
        I'm a self-taught product manager and indie hacker.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "FAR Capital Sdn. Bhd.",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
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
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
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
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
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
    display: true, // set to false to hide this section
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
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
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
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Resources",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
