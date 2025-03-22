"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Web Wallet</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/signup")}>Signup</Button>
        <Button onClick={() => router.push("/login")}>Login</Button>
      </div>
    </div>
  );
}