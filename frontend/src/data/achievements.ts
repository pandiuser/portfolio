export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: "Trophy" | "Award" | "Sparkles" | "Star" | "BadgeCheck";
  image?: string;
};

export const achievements: Achievement[] = [
  {
    id: "moe",
    title: "Most Valuable Player Award",
    issuer: "AppViewX",
    date: "Sep 2023",
    description:
      "Recognized for instrumental contributions to a high-impact migration program — successfully delivering across multiple customers under aggressive timelines and shifting requirements.",
    icon: "Trophy",
    image: "/awards/mvp.jpg",
  },
  {
    id: "circle",
    title: "Circle of Excellence",
    issuer: "AppViewX",
    date: "Nov 2023",
    description:
      "Awarded for outstanding contribution to large-scale customer solutions, automation initiatives, and business impact across the AppViewX customer base.",
    icon: "Award",
    image: "/awards/excellence.jpg",
  },
  {
    id: "spot",
    title: "Spot Award",
    issuer: "AppViewX",
    date: "Jan 2024",
    description:
      "Recognized for strong analytical and troubleshooting skills, resolving complex client issues including a programmable-connector Cert Push case for Dominion Energy.",
    icon: "Sparkles",
    image: "/awards/spot.jpg",
  },
];

export type Education = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  grade: string;
  highlights: string[];
};

export const education: Education[] = [
  {
    id: "mepco",
    degree: "Bachelor of Engineering",
    field: "Electronics & Communication Engineering",
    institution: "Mepco Schlenk Engineering College",
    location: "Sivakasi, Tamil Nadu",
    startYear: "2018",
    endYear: "2022",
    grade: "CGPA 8.29 / 10",
    highlights: [
      "Strong foundation in algorithms, electronics, and communication systems.",
      "Built analytical and systems-thinking habits that anchor my backend engineering practice today.",
    ],
  },
];
