"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Credits from "@/components/Credits";
import Debits from "@/components/Debits";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Balance from "@/components/Balance";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    branch: string;
    accountNumber: string;
    money: number;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Fetch user details from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    router.push("/login"); // Redirect to login
  };

  return (
    <div className="h-screen w-screen flex flex-col relative">
      {/* Header (unchanged) */}
      <Header />

      {/* Login/Signup or Logout Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button onClick={() => router.push("/signup")}>Signup</Button>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </>
        )}
      </div>

      {/* Full-Screen Resizable Panel Group */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel className="h-full" defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel className="h-full" defaultSize={50}>
              <Credits />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="h-full" defaultSize={50}>
              <Debits />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-full" defaultSize={50}>
          {/* Pass user data to the Balance component */}
          <Balance user={user} />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Footer (unchanged) */}
      <Footer />
    </div>
  );
}