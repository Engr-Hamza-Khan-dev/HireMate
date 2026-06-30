export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedAt: string;
  matchPercentage: number;
  isRemote: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Resume {
  id: string;
  filename: string;
  updatedAt: string;
  matchPercentage: number;
}

export interface CoverLetter {
  id: string;
  filename: string;
  updatedAt: string;
}

export interface MatchAnalysis {
  skillsMatch: boolean;
  experienceLevel: boolean;
  projectsAlign: boolean;
  keywordsMatch: boolean;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Vercel",
    companyLogo: "https://logo.clearbit.com/vercel.com",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 yrs",
    salary: "$100k-$140k/year",
    postedAt: "Posted 2 hours ago",
    matchPercentage: 95,
    isRemote: true,
    description:
      "We're looking for a talented Frontend Developer to join our team. You'll work on building the next generation of our platform with cutting-edge technologies.",
    responsibilities: [
      "Build responsive and accessible user interfaces",
      "Collaborate with designers and product teams",
      "Write clean, maintainable code",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "3+ years of experience with React",
      "Proficiency in TypeScript",
      "Experience with modern CSS frameworks",
      "Strong problem-solving skills",
    ],
  },
  {
    id: "2",
    title: "Senior UI Engineer",
    company: "Linear",
    companyLogo: "https://logo.clearbit.com/linear.app",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "4-6 yrs",
    salary: "$150k-$180k/year",
    postedAt: "Posted 1 day ago",
    matchPercentage: 88,
    isRemote: false,
    description: "Join Linear to build tools that improve how teams work together.",
    responsibilities: [
      "Design and implement complex UI components",
      "Mentor junior engineers",
      "Contribute to architecture decisions",
    ],
    requirements: [
      "5+ years front-end experience",
      "Expert in React and TypeScript",
      "Experience with design systems",
    ],
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Notion",
    companyLogo: "https://logo.clearbit.com/notion.so",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 yrs",
    salary: "$120k-$150k/year",
    postedAt: "Posted 3 days ago",
    matchPercentage: 82,
    isRemote: true,
    description: "Help shape the future of Notion's product experience.",
    responsibilities: [
      "Design user-centered interfaces",
      "Create prototypes and design specs",
      "Work closely with engineering teams",
    ],
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma",
      "Understanding of front-end development",
    ],
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "Stripe",
    companyLogo: "https://logo.clearbit.com/stripe.com",
    location: "New York, NY",
    type: "Full-time",
    experience: "2-4 yrs",
    salary: "$130k-$160k/year",
    postedAt: "Posted 2 days ago",
    matchPercentage: 91,
    isRemote: false,
    description: "Build the future of payments infrastructure.",
    responsibilities: [
      "Develop scalable backend services",
      "Work on distributed systems",
      "Collaborate on technical specifications",
    ],
    requirements: [
      "Experience with Go or Python",
      "Understanding of distributed systems",
      "Strong analytical skills",
    ],
  },
  {
    id: "5",
    title: "Full Stack Developer",
    company: "GitHub",
    companyLogo: "https://logo.clearbit.com/github.com",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 yrs",
    salary: "$110k-$145k/year",
    postedAt: "Posted 5 hours ago",
    matchPercentage: 87,
    isRemote: true,
    description: "Join GitHub to empower developers worldwide.",
    responsibilities: [
      "Build full-stack web applications",
      "Maintain and improve existing services",
      "Write automated tests",
    ],
    requirements: [
      "Full-stack development experience",
      "Node.js or Ruby knowledge",
      "Database design skills",
    ],
  },
];

export const RESUME: Resume = {
  id: "resume-1",
  filename: "Hamza_Khan_Frontend_Developer.pdf",
  updatedAt: "Updated 1 hour ago",
  matchPercentage: 95,
};

export const COVER_LETTER: CoverLetter = {
  id: "cl-1",
  filename: "Hamza_Khan_Cover_Letter.pdf",
  updatedAt: "Updated 1 hour ago",
};

export const MATCH_ANALYSIS: MatchAnalysis = {
  skillsMatch: true,
  experienceLevel: true,
  projectsAlign: true,
  keywordsMatch: true,
};