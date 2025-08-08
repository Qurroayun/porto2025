import { notFound } from "next/navigation";
import { AnimatedProjectDetail } from "@/components/AnimatedProjectDetail"; // ini client

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

async function getProject(id: string): Promise<Project | null> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetailPage(context: {
  params: Promise<{ id: string }>;
}) {
  const project = await getProject((await context.params).id);

  if (!project) notFound();

  return (
    <AnimatedProjectDetail
      title={project.title}
      imageUrl={project.imageUrl}
      description={project.description}
    />
  );
}
