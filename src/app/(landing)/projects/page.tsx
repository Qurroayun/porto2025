import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status?: string;
  techStack?: string[];
};

const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_BASE_URL || "https://qurro-porto.vercel.app";
  }
  return "http://localhost:3000";
};

async function getProjects(): Promise<Project[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
    next: { tags: ["projects"] },
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto  py-12 px-4 sm:px-6 lg:px-8">
      {/* Fixed header with properly escaped characters */}
      <header className="container mx-auto mb-16 border-b border-[#333] pb-8">
        <h1 className="text-4xl font-mono font-bold text-[#4FC1FF] mb-3">
          <span className="text-[#569CD6]">const</span>{" "}
          <span className="text-[#4FC1FF]">myProjects</span>{" "}
          <span className="text-[#569CD6]">=</span>{" "}
          <span className="text-[#CE9178]">()</span>{" "}
          <span className="text-[#569CD6]">{"=>"}</span>{" "}
          <span className="text-[#CE9178]">{"{"}</span>
        </h1>
      </header>

      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group rounded-lg overflow-hidden border border-[#252525] hover:border-[#4EC9B0] transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(78,201,176,0.3)]">
            <div className="relative h-64 w-full bg-[#1E1E1E] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-mono text-[#9CDCFE] text-sm bg-[#1E1E1E]/90 px-3 py-1.5 rounded">
                  <span className="text-[#569CD6]">viewProject</span>
                  <span className="text-[#D4D4D4]">(</span>
                  <span className="text-[#CE9178]">
                    &quot;{project.title}&quot;
                  </span>
                  <span className="text-[#D4D4D4]">)</span>
                </span>
              </div>
            </div>

            <div className="p-5">
              <h2 className="font-mono text-xl font-semibold text-[#4FC1FF] mb-2 group-hover:text-[#4EC9B0] transition-colors">
                {project.title}
              </h2>
              <p className="font-mono dark:text-[#D4D4D4] text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.status && (
                  <span className="font-mono text-xs px-2.5 py-1 bg-[#4EC9B0]/10 text-[#4EC9B0] rounded-full">
                    {project.status}
                  </span>
                )}
                {project.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 bg-[#1E1E1E] text-[#B5CEA8] border border-[#333] rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <p className="font-mono text-[#569CD6] text-4xl">{"}"}</p>
      </div>
    </div>
  );
}
