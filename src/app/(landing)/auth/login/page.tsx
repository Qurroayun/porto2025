"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      console.error(res?.error);
      alert("Login gagal. Periksa email/password.");
    }
    if (!email.includes("@")) {
      alert("Email tidak valid");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center dark:text-green-300">
          Login
        </h2>

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="!dark:bg-green-700"
          />
          <Input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full dark:bg-green-400"
          disabled={loading}>
          {loading ? "Loading..." : "Masuk"}
        </Button>

        {/* <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="text-green-300 hover:underline">
            Daftar sekarang
          </Link>
        </p> */}
      </form>
    </div>
  );
}
