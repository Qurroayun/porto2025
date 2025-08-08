"use client";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaCloudflare,
  FaGithub,
  FaGitlab,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNestjs,
  SiSupabase,
  SiNeovim,
  SiFirebase,
  SiGoland,
  SiMysql,
  SiPostgresql,
  SiNextdotjs,
  SiGo,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "NestJS", icon: <SiNestjs /> },
  { name: "Go", icon: <SiGo /> },
  { name: "GoFiber", icon: <SiGoland /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "Neon", icon: <SiNeovim /> }, // Gunakan Neovim icon sementara karena Neon belum tersedia
  { name: "Supabase", icon: <SiSupabase /> },
  // { name: "Firebase", icon: <SiFirebase /> },
  // { name: "Cloudflare", icon: <FaCloudflare /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitLab", icon: <FaGitlab /> },
];

export default function SkillSection() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        He He He Technologiaaaaa
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow hover:scale-105 transition-transform">
            <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">
              {skill.icon}
            </div>
            <p className="text-md font-semibold text-gray-800 dark:text-gray-200">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
