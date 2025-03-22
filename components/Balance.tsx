"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-hot-toast";

interface User {
  name: string;
  branch: string;
  accountNumber: string;
  money: number;
  email: string;
}

interface BalanceProps {
  user: User | null;
}

export default function Balance({ user }: BalanceProps) {
  const [vpa, setVPA] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!vpa || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to transfer money.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderEmail: user.email, vpa, amount: amountNumber }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Transfer successful!");
        setVPA("");
        setAmount("");
        // Update the user's balance in the UI
        if (user) {
          user.money -= amountNumber;
        }
      } else {
        toast.error(data.error || "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-stone-200 from-blue-50 to-purple-50 h-full rounded-lg shadow-lg border border-gray-200 items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Account Overview</h2>
      {user ? (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-2xl font-bold text-green-600">₹{user.money}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Branch</p>
            <p className="text-lg font-semibold text-gray-800">{user.branch}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Account Number</p>
            <p className="text-lg font-semibold text-gray-800">{user.accountNumber}</p>
          </div>
          
          <div className="flex flex-col space-y-4 items-center">
            <Input
              placeholder="Enter VPA"
              value={vpa}
              onChange={(e) => setVPA(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleTransfer} disabled={loading}>
              {loading ? "Transferring..." : "Transfer Money"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">Please log in to view your balance.</p>
        </div>
      )}
    </div>
  );
}