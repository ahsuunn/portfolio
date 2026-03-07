export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  bio: string; // raw MDX body rendered to string
}

export interface Job {
  order: number;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Project {
  order: number;
  name: string;
  role: string;
  period: string;
  techStack: string;
  highlights: string[];
}

export interface Skills {
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  gpa: string;
  period: string;
}

export interface Award {
  title: string;
  event: string;
  date: string;
  description: string;
}
