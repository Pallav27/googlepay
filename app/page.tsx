"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Transactions from "@/components/Transactions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Balance from "@/components/Balance";
import TransactionChart from "@/components/Chart"; // Import the Chart component

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    branch: string;
    accountNumber: string;
    money: number;
    email: string;
    VPA: string;
    debits: { amount: number; to: string; timestamp: Date }[];
    credits: { amount: number; from: string; timestamp: Date }[];
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleTransfer = async (vpa: string, amount: number) => {
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderEmail: user?.email, vpa, amount }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.sender);
      localStorage.setItem("user", JSON.stringify(data.sender));
    } else {
      throw new Error(data.error || "Transfer failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <Header />

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

      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel className="h-full" defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel className="h-full" defaultSize={50}>
              {/* Transaction Chart Component */}
              <TransactionChart
                transactions={(user?.debits || []).map((debit) => ({
                  date: new Date(debit.timestamp).toLocaleDateString(),
                  debits: debit.amount,
                  credits: 0,
                })).concat(
                  (user?.credits || []).map((credit) => ({
                    date: new Date(credit.timestamp).toLocaleDateString(),
                    debits: 0,
                    credits: credit.amount,
                  }))
                )}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="h-full" defaultSize={50}>
              <Transactions debits={user?.debits || []} credits={user?.credits || []} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-full" defaultSize={50}>
          <Balance user={user} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Footer />
    </div>
  );
}
