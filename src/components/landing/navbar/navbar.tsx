"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full px-6 py-4 border-b border-green-500/40 bg-[#f8f9fa] dark:bg-black text-gray-900 dark:text-green-400 font-mono shadow-sm">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left: Credential Links */}
        <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-mono">
          <span className="text-[#569CD6] font-bold">(() =&gt; &#123;</span>

          <Link
            href="/"
            className="hover:underline text-pink-500 dark:text-pink-500">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:underline text-cyan-400 dark:text-cyan-400">
            About
          </Link>
          <Link
            href="/projects"
            className="hover:underline text-yellow-400 dark:text-yellow-400">
            Projects
          </Link>
          <Link
            href="/contact"
            className="hover:underline text-green-400 dark:text-green-400">
            Contact
          </Link>

          <span className="text-[#569CD6] font-bold">&#125;)();</span>
        </div>

        {/* Center: TypeScript-style Name */}
        <Link href="/">
          <div className="text-center font-mono text-[0.95rem] leading-tight">
            <span className="text-green-600 dark:text-green-400 font-bold">
              const
            </span>{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              QurottaAyun
            </span>
            <span className="text-white dark:text-white">: </span>
            <span className="text-yellow-600 dark:text-yellow-300">
              Developer
            </span>
            <span className="text-white">&lt;</span>
            <span className="text-pink-500">
              &quot;Frontend&quot; | &quot;Backend&quot;
            </span>
            <span className="text-white">&gt;</span> ={" "}
            <span className="text-white">&#123;</span>
          </div>
        </Link>

        {/* Right: Toggle Theme + Login */}
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          )}
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          {/* Center: TypeScript-style Name */}
          <div className="text-left font-mono text-xs">
            <span className="text-green-600 font-bold">const</span>{" "}
            <span className="text-blue-600 font-bold">QurottaAyun</span>
            <span className="text-white">: </span>
            <span className="text-yellow-600">Developer</span>
            <span className="text-white">&lt;</span>
            <span className="text-pink-500">
              &quot;Frontend&quot; | &quot;Creative&quot;
            </span>
            <span className="text-white">&gt;</span> ={" "}
            <span className="text-white">&#123;</span>
          </div>

          {/* Toggle Dropdown Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="mt-4 w-full text-sm tracking-widest uppercase flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium">
              <span className="opacity-50 dark:opacity-60 font-bold">
                (() =&gt; &#123;
              </span>

              <Link
                href="#/"
                className="hover:underline text-gray-700 dark:text-green-300">
                Home
              </Link>
              <Link
                href="/about"
                className="hover:underline text-gray-700 dark:text-green-300">
                About
              </Link>
              <Link
                href="/projects"
                className="hover:underline text-gray-700 dark:text-green-300">
                Projects
              </Link>
              <Link
                href="/contact"
                className="hover:underline text-gray-700 dark:text-green-300">
                Contact
              </Link>

              <span className="opacity-50 dark:opacity-60 font-bold">
                &#125;);
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
