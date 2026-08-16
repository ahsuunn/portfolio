'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '../lib/types';
import type { IconType } from 'react-icons';
import { FiCode } from 'react-icons/fi';
import ProjectLightbox from './ProjectLightbox';
import {
  SiAndroid,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGooglemaps,
  SiHono,
  SiHuggingface,
  SiJetpackcompose,
  SiKotlin,
  SiLivekit,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOnnx,
  SiOpenapiinitiative,
  SiOpenstreetmap,
  SiPayloadcms,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiReactquery,
  SiRedis,
  SiResend,
  SiSocketdotio,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiXendit,
  SiZod,
} from 'react-icons/si';

interface Props {
  projects: Project[];
}

const techStackIcons: Record<string, IconType> = {
  'Next.js': SiNextdotjs,
  'Next.js 16': SiNextdotjs,
  TypeScript: SiTypescript,
  React: SiReact,
  'React.js': SiReact,
  TailwindCSS: SiTailwindcss,
  'Express.js': SiExpress,
  Express: SiExpress,
  'Node.js': SiNodedotjs,
  'Node.js / Express': SiNodedotjs,
  'Node.js/Express': SiNodedotjs,
  'Hono.js': SiHono,
  Hono: SiHono,
  'Drizzle ORM': SiDrizzle,
  'Prisma ORM': SiPrisma,
  Prisma: SiPrisma,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
  Nginx: SiNginx,
  PHP: SiPhp,
  'Socket.io': SiSocketdotio,
  Flutter: SiFlutter,
  Firebase: SiFirebase,
  'Firebase Auth': SiFirebase,
  'Cloud Firestore': SiFirebase,
  'TanStack Query': SiReactquery,
  Python: SiPython,
  PyTorch: SiPytorch,
  'Hugging Face': SiHuggingface,
  'Hugging Face Transformers': SiHuggingface,
  'ONNX Runtime': SiOnnx,
  Zod: SiZod,
  Resend: SiResend,
  'Google Maps API': SiGooglemaps,
  'Google Maps': SiGooglemaps,
  'Payload CMS': SiPayloadcms,
  Payload: SiPayloadcms,
  Supabase: SiSupabase,
  'Supabase S3': SiSupabase,
  Vitest: SiVitest,
  Xendit: SiXendit,
  Kotlin: SiKotlin,
  'Android SDK': SiAndroid,
  Android: SiAndroid,
  'Jetpack Compose': SiJetpackcompose,
  'Room DB': SiSqlite,
  'Room SQLite': SiSqlite,
  Room: SiSqlite,
  LiveKit: SiLivekit,
  OSMDroid: SiOpenstreetmap,
  WebSockets: SiSocketdotio,
  'Firebase Cloud Messaging (FCM)': SiFirebase,
  FCM: SiFirebase,
  OpenAPI: SiOpenapiinitiative,
};

function getTechItems(techStack: string): string[] {
  return techStack
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectsSection({ projects }: Props) {
  const [lightbox, setLightbox] = useState<{
    name: string;
    images: string[];
    index: number;
  } | null>(null);

  return (
    <section className="section-content">
      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 items-start">
              <div className="min-w-0 space-y-3">
                <div>
                  <h3 className="text-md font-medium mb-1 wrap-break-word">{project.name}</h3>
                  <div className="text-gray-700 dark:text-[#ABABAB] space-y-1">
                    <p className="font-medium text-gray-700 dark:text-[#ABABAB]">{project.role}</p>
                    <p>{project.period}</p>
                  </div>
                </div>

                {project.techStack && (
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {getTechItems(project.techStack).map((tech) => {
                      const Icon = techStackIcons[tech] ?? FiCode;

                      return (
                        <span
                          key={tech}
                          className="max-w-full inline-flex items-center gap-1.5 rounded-md border border-black/8 dark:border-white/15 px-2 py-1 text-[11px] text-gray-700 dark:text-[#ABABAB] bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/30 dark:hover:border-white/40 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white transition-all whitespace-normal wrap-break-word font-medium"
                        >
                          <Icon size={12} className="text-black/80 dark:text-white/80" />
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}

                {project.images && project.images.length > 0 && (
                  <div className="pt-2">
                    <div
                      onClick={() =>
                        setLightbox({
                          name: project.name,
                          images: project.images!,
                          index: 0,
                        })
                      }
                      className="relative aspect-video w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] group cursor-pointer shadow-xs"
                    >
                      <Image
                        src={project.images[0]}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.images.length > 1 && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-black/75 text-white border border-white/20">
                          +{project.images.length - 1} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <ul className="min-w-0 space-y-2 text-black dark:text-white text-sm md:text-[15px] leading-relaxed list-disc pl-4 marker:text-black dark:marker:text-white">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <ProjectLightbox
          projectName={lightbox.name}
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
