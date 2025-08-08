// src/features/projects/actions.ts
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export async function getProjects(): Promise<Project[]> {
  // Simulasi fetch dari backend / DB
  return [
    {
      id: 1,
      title: "Next.js Portfolio",
      description: "Portfolio modern dengan Next.js 15 + ShadCN UI",
      image: "https://source.unsplash.com/600x400/?website,design",
    },
    {
      id: 2,
      title: "Fullstack E-Commerce",
      description: "Website toko online menggunakan Next.js & PostgreSQL",
      image: "https://source.unsplash.com/600x400/?ecommerce,store",
    },
    {
      id: 3,
      title: "Landing Page AI",
      description: "Desain landing page untuk produk AI tools",
      image: "https://source.unsplash.com/600x400/?ai,landing",
    },
  ];
}
