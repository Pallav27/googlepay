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
  VPA: string;
  debits: { amount: number; to: string; timestamp: Date }[];
  credits: { amount: number; from: string; timestamp: Date }[];
}

interface BalanceProps {
  user: User | null;
  onTransfer: (vpa: string, amount: number) => Promise<void>;
}

export default function Balance({ user, onTransfer }: BalanceProps) {
  const [vpa, setVPA] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vpa || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (amountNumber <= 0) {
      toast.error("Amount must be greater than 0.");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to transfer money.");
      return;
    }

    if (amountNumber > user.money) {
      toast.error("Insufficient balance.");
      return;
    }

    setLoading(true);
    try {
      await onTransfer(vpa, amountNumber);
      toast.success("Transfer successful!");
      setVPA("");
      setAmount("");
    } catch (error) {
      // Prefixing with underscore to indicate it's intentionally unused
      console.log(error);
      
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

          {/* Transfer Form */}
          <form onSubmit={handleTransfer} className="flex flex-col space-y-4 items-center">
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
            <Button type="submit" disabled={loading}>
              {loading ? "Transferring..." : "Transfer Money"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">Please log in to view your balance.</p>
        </div>
      )}
    </div>
  );
}