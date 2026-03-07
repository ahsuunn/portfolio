import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Profile, Job, Project, Skills, Education, Award, Research } from './types';

const contentDir = path.join(process.cwd(), 'content');

function readMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return matter(raw);
}

export function getProfile(): Profile {
  const { data, content } = readMdx(path.join(contentDir, 'profile.mdx'));
  return {
    name: data.name,
    title: data.title,
    email: data.email,
    linkedin: data.linkedin,
    github: data.github,
    bio: content.trim(),
  };
}

export function getExperience(): Job[] {
  const dir = path.join(contentDir, 'experience');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort();
  return files.map((file, i) => {
    const { data } = readMdx(path.join(dir, file));
    return {
      order: data.order ?? i,
      role: data.role,
      company: data.company,
      period: data.period,
      location: data.location,
      highlights: data.highlights ?? [],
    } as Job;
  });
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, 'projects');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort();
  return files.map((file, i) => {
    const { data } = readMdx(path.join(dir, file));
    return {
      order: data.order ?? i,
      name: data.name,
      role: data.role,
      period: data.period,
      techStack: data.techStack ?? '',
      highlights: data.highlights ?? [],
    } as Project;
  });
}

export function getSkills(): Skills {
  const { data } = readMdx(path.join(contentDir, 'skills.mdx'));
  return {
    hardSkills: data.hardSkills ?? [],
    softSkills: data.softSkills ?? [],
    languages: data.languages ?? [],
  };
}

export function getEducation(): Education {
  const { data } = readMdx(path.join(contentDir, 'education.mdx'));
  return {
    institution: data.institution,
    location: data.location,
    degree: data.degree,
    gpa: data.gpa,
    period: data.period,
  };
}

export function getAwards(): Award[] {
  const { data } = readMdx(path.join(contentDir, 'awards.mdx'));
  return (data.awards ?? []) as Award[];
}

export function getResearch(): Research[] {
  const { data } = readMdx(path.join(contentDir, 'research.mdx'));
  return (data.research ?? []) as Research[];
}
