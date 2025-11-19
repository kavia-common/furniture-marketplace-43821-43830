"use client";
import { useEffect } from "react";
import { apiSend } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    apiSend("auth/logout/", "POST", {}).finally(() => {
      router.replace("/auth/login");
    });
  }, [router]);
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-[60vh]">
        <div className="text-lg" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
          Logging out...
        </div>
      </main>
    </>
  );
}
