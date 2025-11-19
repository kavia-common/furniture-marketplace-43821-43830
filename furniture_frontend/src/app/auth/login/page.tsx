"use client";
import { useState } from "react";
import { apiSend } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto mt-16 bg-surface p-8 radius-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-primary">Login to your account</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            setLoading(true);
            try {
              await apiSend("auth/login/", "POST", { email, password });
              router.push("/products");
            } catch (e) {
              if (e instanceof Error) {
                setErr(e.message);
              } else {
                setErr("Login failed");
              }
            } finally {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-4"
        >
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="border px-4 py-2 radius-md"
            required
            autoComplete="email"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="border px-4 py-2 radius-md"
            required
            autoComplete="current-password"
          />
          {err && <div className="text-danger">{err}</div>}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 radius-md font-semibold mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-secondary underline">Register</Link>
        </p>
      </main>
    </>
  );
}
