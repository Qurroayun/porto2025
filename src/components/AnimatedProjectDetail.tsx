"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AnimatedProjectDetail({
  title,
  imageUrl,
  description,
}: {
  title: string;
  imageUrl: string;
  description: string;
}) {
  return (
    <motion.div
      className="min-h-screen bg-zinc-900 text-zinc-100 py-16 px-4 md:px-12 font-mono"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-block mb-8 text-[#4EC9B0] hover:text-[#9CDCFE] transition-colors">
          ← Back to Projects
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-[#9CDCFE] mb-6">
          {title}
        </h1>

        <motion.div
          className="relative w-full h-72 md:h-[500px] mb-8 rounded overflow-hidden border border-zinc-700"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}>
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </motion.div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 shadow-md">
          <pre className="text-[#D4D4D4] whitespace-pre-wrap break-words text-sm md:text-base">
            {`// Deskripsi Project
${description}
`}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
