"use client";

import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Email terkirim!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Gagal mengirim email");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-start">
        {/* Left: Icons */}
        <div className="flex flex-row lg:flex-col gap-6 text-3xl text-blue-600 dark:text-blue-400 justify-center items-center w-full lg:w-auto">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition">
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition">
            <FaGithub />
          </a>
          <a
            href="https://gitlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition">
            <FaGitlab />
          </a>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center text-center">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Do you have a project? <br />
            Or want to collaborate on something awesome? <br />
            you want fast ? sorry i&apos;m human you can use GPT
          </p>
        </div>

        <div className="lg:hidden mt-10 text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Do you have a project? Or want to collaborate on something awesome?
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
