"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#d3b184] text-gray-800">
      
      <div className="mb-8">
        <img src="/wallet.png" alt="Web Wallet Logo" width={200} height={200} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-bold mb-4 font-mono">Web Wallet</h1>
        <p className="text-xl mb-8">
          Your one-stop solution for managing your finances effortlessly.
        </p>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <Card className="bg-stone-200 text-gray-800 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Streamline your transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Manage your finances with ease and keep track of your transactions in one place.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-stone-200 text-gray-800 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Visualise the data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
                Visualise the data with our intuitive charts and graphs to help you make informed decisions.
            </p>
          </CardContent>
        </Card>
        
      </div>
      
    </div>
  );
}