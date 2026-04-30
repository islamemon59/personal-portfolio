import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  badge: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  image: string;
  resume: string;
  socials: SocialLink[];
};

export type FocusArea = {
  title: string;
  detail: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillGroup = {
  category: string;
  level: string;
  score: number;
  skills: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  details: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  gallery?: string[];
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  challenges: string[];
  future: string[];
};

export type NavItem = {
  label: string;
  id: string;
};

export type IconMap = Record<string, LucideIcon>;

export const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const profile: Profile = {
  name: "Emon Hossain",
  role: "Full Stack Web Developer",
  badge: "Available for freelance work",
  intro:
    "I design and build modern, responsive, and user-friendly web applications with clean UI, smooth performance, and practical functionality.",
  location: "Dhaka, Bangladesh",
  email: "islamemon59@email.com",
  phone: "+880 1920228756",
  whatsapp: "+880 1920228756",
  image: "https://i.ibb.co.com/WZMPwXB/portfolio-image.png",
  resume: "https://drive.google.com/file/d/1ipZo6FuU_JutbGmMHp6x46aJNiUgFsGf/view?usp=sharing",
  socials: [
    { label: "GitHub", href: "https://github.com/islamemon59" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Facebook", href: "https://www.facebook.com/n.bi.ta.554015" },
    { label: "Twitter/X", href: "https://x.com/home" },
    { label: "Email", href: "mailto:islamemon59@email.com" },
  ],
};

export const about =
  "I am a passionate web developer who enjoys turning ideas into real digital products. My programming journey started with curiosity about how websites work, and over time I learned to build responsive layouts, interactive user interfaces, and practical web applications. I enjoy working on clean UI design, solving real problems with code, and improving user experience through small details like animation, speed, and accessibility.";

export const focusAreas: FocusArea[] = [
  {
    title: "Frontend polish",
    detail:
      "Responsive interfaces, tasteful animation, and accessible UI details.",
  },
  {
    title: "Backend flow",
    detail:
      "APIs, authentication concepts, file uploads, and useful product logic.",
  },
  {
    title: "SEO basics",
    detail:
      "Clean page structure, readable content hierarchy, and fast-loading assets.",
  },
  {
    title: "Product thinking",
    detail:
      "Practical decisions that make websites easier to use, maintain, and trust.",
  },
];

export const stats: Stat[] = [
  { value: "3+", label: "Featured Projects" },
  { value: "15+", label: "Tools Practiced" },
  { value: "2026", label: "Portfolio Ready" },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    level: "Comfortable",
    score: 86,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    category: "Backend",
    level: "Intermediate",
    score: 74,
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "Authentication",
      "File Upload",
      "API Integration",
    ],
  },
  {
    category: "Database",
    level: "Learning",
    score: 62,
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Prisma"],
  },
  {
    category: "Tools",
    level: "Comfortable",
    score: 82,
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Chrome DevTools"],
  },
  {
    category: "Other",
    level: "Practical",
    score: 70,
    skills: ["WordPress", "SEO", "Deployment", "Performance Optimization"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Arts in English Literature",
    institution: "Shanto Mariam University of Creative Technology",
    period: "2023 - Present",
    details: "English literature studies with a focus on modern and contemporary works.",
  },
  {
    degree: "Full Stack Web Development",
    institution: "Programming Hero",
    period: "2025 - 2026",
    details:
      "Web Development, React, JavaScript, WordPress, or related training.",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer Intern",
    company: "USA Promoting LLC",
    period: "August 2026 - Present",
    responsibilities: [
      "Built responsive pages and reusable UI sections.",
      "Fixed interface bugs and improved mobile layout quality.",
      "Integrated API data into practical frontend workflows.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Client / Marketplace",
    period: "Jan 2025 - Jul 2025",
    responsibilities: [
      "Created landing pages, WordPress websites, and personal portfolio sites.",
      "Set up basic SEO structure, page speed improvements, and contact flows.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "moviehubportal",
    title: "MovieHub Portal",
    eyebrow: "Movie discovery web app",
    image: "https://i.ibb.co.com/JFSjvHF1/image.png",
    gallery: [
      "https://i.ibb.co.com/JFSjvHF1/image.png",
      "https://i.ibb.co.com/mCZwFcDJ/Screenshot-2026-04-30-215912.png",
      "https://i.ibb.co.com/7dTCDWBQ/Screenshot-2026-04-30-220306.png",
      "https://i.ibb.co.com/ZRMsY59j/Screenshot-2026-04-30-215857.png",
    ],
    summary:
      "A movie and series portal for browsing titles, exploring details, and discovering entertainment content.",
    description:
      "MovieHub Portal is a responsive entertainment web app where users can explore movie and series content through a clean interface, organized cards, and dedicated detail views. The project focuses on smooth browsing, practical routing, and a polished user experience for media discovery.",
    stack: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "REST API",
      "Responsive Design",
    ],
    liveUrl: "https://movie-hub-frontend-zeta.vercel.app/",
    githubUrl: "https://github.com/islamemon59/movie-series-portal-frontend",
    highlights: [
      "Movie and series browsing experience with organized content cards.",
      "Dedicated detail flow for exploring individual titles.",
      "Responsive layout designed for mobile, tablet, and desktop screens.",
    ],
    challenges: [
      "Keeping media-heavy cards visually clean across different screen sizes.",
      "Structuring title data so users can scan and find content quickly.",
      "Balancing visual polish with fast page loading and simple navigation.",
    ],
    future: [
      "Add search, filter, and category-based discovery.",
      "Add user watchlists and favorite titles.",
      "Improve title detail pages with trailers, ratings, and cast information.",
      "Add authentication for personalized movie recommendations.",
    ],
  },
  {
    slug: "skillbridge",
    title: "SkillBridge",
    eyebrow: "Learning management platform",
    image: "https://i.ibb.co.com/FkpMddNC/image.png",
    gallery: [
      "https://i.ibb.co.com/FkpMddNC/image.png",
      "https://i.ibb.co.com/N205XtWx/image.png",
      "https://i.ibb.co.com/BK7H9TBH/image.png",
    ],
    summary:
      "A learning platform that connects students with courses, instructors, and skill-building resources.",
    description:
      "SkillBridge is an online learning platform concept built to make course discovery, enrollment, and progress tracking easier. It presents learning content in a clear structure so students can browse courses, understand lessons, and continue building practical skills.",
    stack: [
      "React",
      "Tailwind CSS",
      "REST API",
      "Authentication",
      "Responsive Design",
    ],
    liveUrl: "https://b6-a4-front-end.vercel.app/",
    githubUrl: "https://github.com/islamemon59/B6-A4-FrontEnd",
    highlights: [
      "Course-focused interface for browsing and learning content.",
      "Student-friendly layout with clear sections and calls to action.",
      "Reusable components for course cards, details, and platform sections.",
    ],
    challenges: [
      "Organizing learning information so it feels simple instead of crowded.",
      "Designing reusable course components that stay consistent across pages.",
      "Keeping the platform responsive and readable on smaller devices.",
    ],
    future: [
      "Add instructor dashboards and course management tools.",
      "Add lesson progress tracking and completion status.",
      "Add payment or enrollment flow for premium courses.",
      "Add reviews, ratings, and saved courses.",
    ],
  },
  {
    slug: "innliv",
    title: "Innliv Online Gaming Store",
    eyebrow: "Gaming store landing page",
    image: "https://i.ibb.co.com/206r7Nmr/Screenshot-2026-04-30-210246.png",
    gallery: [
      "https://i.ibb.co.com/206r7Nmr/Screenshot-2026-04-30-210246.png",
      "https://i.ibb.co.com/5hntsgb3/image.png",
      "https://i.ibb.co.com/CDDykK8/image.png",
    ],
    summary:
      "An online gaming store experience for showcasing games, accessories, and digital products.",
    description:
      "Innliv is an online gaming store project built around a strong product presentation, clear browsing flow, and conversion-focused layout. The project highlights gaming products with responsive sections, direct calls to action, and a modern storefront feel.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
    liveUrl: "https://innliv.com/",
    githubUrl: "https://github.com/islamemon59",
    highlights: [
      "Gaming-store layout with product-focused visual hierarchy.",
      "Responsive sections for featured products, offers, and store details.",
      "Clear calls to action for browsing and purchasing.",
    ],
    challenges: [
      "Making the store feel energetic while keeping the layout clean.",
      "Presenting product information clearly on mobile screens.",
      "Balancing rich visuals with speed and SEO-friendly structure.",
    ],
    future: [
      "Add product categories, filtering, and search.",
      "Add cart, checkout, and customer account features.",
      "Add product reviews and wishlist functionality.",
      "Improve product detail pages with richer media and specifications.",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
