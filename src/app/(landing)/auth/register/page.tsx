"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/auth/login")
    } else {
      alert("Registrasi gagal")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-green-300">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full dark:bg-green-400 dark:text-black"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-700 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
