import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillSection from "./(landing)/skills/SkillSection";

export default function page() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-zinc-100 px-4 md:px-12 py-16 font-mono transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Informasi Utama */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#007acc] dark:text-[#4EC9B0]">
            Qurrota Ayun
          </h1>
          <p className="text-xl md:text-2xl text-[#2b6cb0] dark:text-[#9CDCFE]">
            Full Stack Developer
          </p>
          <p className="text-gray-700 dark:text-[#C5C5C5] text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            I design and build digital solutions that feel right from the very
            first interaction — efficient, intuitive, and impactful. Every
            project is a real challenge to solve, not just a technical task. I
            believe the best solutions are born from a deep understanding of the
            problem, then crafted with precision and empathy
          </p>

          {/* Social Media & CV */}
          {/* <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="https://github.com/username"
              target="_blank"
              className="hover:text-[#007acc] dark:hover:text-[#4EC9B0] transition-colors">
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/username"
              target="_blank"
              className="hover:text-[#007acc] dark:hover:text-[#4EC9B0] transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline hover:text-[#007acc] dark:hover:text-[#4EC9B0] transition-colors">
              Lihat CV
            </Link>
          </div> */}

          {/* Tombol Project */}
          <Button
            asChild
            className="mt-6 bg-[#007acc] dark:bg-[#4EC9B0] text-white hover:bg-[#005fa3] dark:hover:bg-[#3bb8a0]">
            <Link href="/projects">Lihat Project →</Link>
          </Button>
        </div>

        {/* Foto Profil */}
        <div className="flex justify-center md:justify-center flex-1 hidden md:block">
          <div className="w-96 h-96 relative rounded-full overflow-hidden border-4 border-[#007acc]/40 dark:border-[#4EC9B0]/40 shadow-md shadow-[#007acc]/10 dark:shadow-[#4EC9B0]/10">
            <Image
              src="/images/PP.png"
              alt="Foto Qurrota Ayun"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section Skill */}
      <div className="mt-20">
        <SkillSection />
      </div>
    </main>
  );
}
