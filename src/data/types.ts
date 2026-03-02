export interface MCPServer {
  name: string;
  repo: string;
  url: string;
  description: string;
  category: string;
  language: string | null;
  isOfficial: boolean;
}

export const CATEGORIES = [
  "All",
  "Aggregators",
  "Browser Automation",
  "Cloud Platforms",
  "Code Execution",
  "Coding Agents",
  "Communication",
  "Databases",
  "Data Platforms",
  "Data Science",
  "Developer Tools",
  "File Systems",
  "Finance",
  "Gaming",
  "Knowledge & Memory",
  "Location",
  "Marketing",
  "Monitoring",
  "Multimedia",
  "Productivity",
  "Research",
  "Search",
  "Security",
  "Social Media",
  "Sports",
  "Support",
  "Translation",
  "Travel",
  "Version Control",
  "Other",
] as const;

export const LANGUAGES = [
  "All",
  "Python",
  "TypeScript",
  "Go",
  "Rust",
  "C#",
  "Java",
  "Ruby",
] as const;
