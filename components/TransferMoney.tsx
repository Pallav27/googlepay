"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TransferMoneyProps {
  onTransfer: (vpa: string, amount: number) => Promise<void>;
}

export default function TransferMoney({ onTransfer }: TransferMoneyProps) {
  const [vpa, setVPA] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!vpa || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      await onTransfer(vpa, amountNumber);
      toast.success("Transfer successful!");
      setVPA("");
      setAmount("");
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Transfer Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter VPA ID"
          value={vpa}
          onChange={(e) => setVPA(e.target.value)}
          className="mb-4"
        />
        <Input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleTransfer}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Transferring..." : "Transfer"}
        </Button>
      </CardContent>
    </Card>
  );
}